// Types

import {
  useCreateGalleryCategoryMutation,
  useCreateGalleryMediaMutation,
  useDeleteGalleryCategoryMutation,
  useDeleteGalleryMediaMutation,
  useGetGalleryCategoriesQuery,
  useGetGalleryMediaQuery,
  useUpdateGalleryCategoryMutation,
  useUpdateGalleryMediaMutation,
  type GalleryCategory,
  type GalleryMedia,
} from "@/store/api/galleryApi";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FolderOpen, Image, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type FormMode = "create" | "edit";

interface CategoryForm {
  name: string;
  description: string;
}

interface MediaForm {
  category: string;
  title: string;
  description: string;
  media_url: File | null;
  is_public: boolean;
}

const emptyCategoryForm: CategoryForm = { name: "", description: "" };

const emptyMediaForm: MediaForm = {
  category: "",
  title: "",
  description: "",
  media_url: null,
  is_public: true,
};

// Component

export const GalleryMgtContent = () => {
  // Queries
  const { data: categories = [], isLoading: loadingCats } =
    useGetGalleryCategoriesQuery();
  const { data: mediaList = [], isLoading: loadingMedia } =
    useGetGalleryMediaQuery();

  // Mutations — categories
  const [createCategory, { isLoading: creatingCat }] =
    useCreateGalleryCategoryMutation();
  const [updateCategory, { isLoading: updatingCat }] =
    useUpdateGalleryCategoryMutation();
  const [deleteCategory, { isLoading: deletingCat }] =
    useDeleteGalleryCategoryMutation();

  // Mutations — media
  const [createMedia, { isLoading: creatingMedia }] =
    useCreateGalleryMediaMutation();
  const [updateMedia, { isLoading: updatingMedia }] =
    useUpdateGalleryMediaMutation();
  const [deleteMedia, { isLoading: deletingMedia }] =
    useDeleteGalleryMediaMutation();

  // Category modal state
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catMode, setCatMode] = useState<FormMode>("create");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState<CategoryForm>(emptyCategoryForm);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  // Media modal state
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaMode, setMediaMode] = useState<FormMode>("create");
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [mediaForm, setMediaForm] = useState<MediaForm>(emptyMediaForm);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [deletingMediaId, setDeletingMediaId] = useState<string | null>(null);
  const mediaFileRef = useRef<HTMLInputElement>(null);

  const isCatBusy = creatingCat || updatingCat;
  const isMediaBusy = creatingMedia || updatingMedia;

  // ── Category handlers ──────────────────────────────────────────────────

  const openCreateCat = () => {
    setCatForm(emptyCategoryForm);
    setCatMode("create");
    setEditingCatId(null);
    setCatModalOpen(true);
  };

  const openEditCat = (record: GalleryCategory) => {
    setCatForm({ name: record.name, description: record.description });
    setCatMode("edit");
    setEditingCatId(record.id);
    setCatModalOpen(true);
  };

  const closeCatModal = () => {
    setCatModalOpen(false);
    setEditingCatId(null);
    setCatForm(emptyCategoryForm);
  };

  const handleCateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCatForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCatSubmit = async () => {
    if (!catForm.name.trim()) {
      toast.error("Category name is required.");
      return;
    }
    try {
      if (catMode === "create") {
        await createCategory(catForm).unwrap();
        toast.success("Category created.");
      } else if (editingCatId) {
        await updateCategory({ id: editingCatId, ...catForm }).unwrap();
        toast.success("Category updated.");
      }
      closeCatModal();
    } catch (err) {
      toast.error("Failed to save category.");
    }
  };

  const handleDeleteCat = async (id: string) => {
    setDeletingCatId(id);
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted.");
    } catch {
      toast.error("Failed to delete category.");
    } finally {
      setDeletingCatId(null);
    }
  };

  // ── Media handlers ─────────────────────────────────────────────────────

  const openCreateMedia = () => {
    setMediaForm(emptyMediaForm);
    setMediaMode("create");
    setEditingMediaId(null);
    setMediaPreview(null);
    setMediaModalOpen(true);
  };

  const openEditMedia = (record: GalleryMedia) => {
    setMediaForm({
      category: record.category,
      title: record.title,
      description: record.description ?? "",
      media_url: null,
      is_public: record.is_public,
    });
    setMediaMode("edit");
    setEditingMediaId(record.id);
    setMediaPreview(record.media_url);
    setMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setMediaModalOpen(false);
    setEditingMediaId(null);
    setMediaForm(emptyMediaForm);
    setMediaPreview(null);
    if (mediaFileRef.current) mediaFileRef.current.value = "";
  };

  const handleMediaChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] ?? null;
      setMediaForm((prev) => ({ ...prev, media_url: file }));
      if (file) setMediaPreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setMediaForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setMediaForm((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleMediaSubmit = async () => {
    if (!mediaForm.category) {
      toast.error("Please select a category.");
      return;
    }
    if (!mediaForm.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (mediaMode === "create" && !mediaForm.media_url) {
      toast.error("Please select a media file.");
      return;
    }
    try {
      if (mediaMode === "create") {
        await createMedia({
          category: mediaForm.category,
          title: mediaForm.title,
          description: mediaForm.description,
          media_url: mediaForm.media_url as File,
          is_public: mediaForm.is_public,
        }).unwrap();
        toast.success("Media uploaded.");
      } else if (editingMediaId) {
        await updateMedia({
          id: editingMediaId,
          category: mediaForm.category,
          title: mediaForm.title,
          description: mediaForm.description,
          is_public: mediaForm.is_public,
          ...(mediaForm.media_url instanceof File && {
            media_url: mediaForm.media_url,
          }),
        }).unwrap();
        toast.success("Media updated.");
      }
      closeMediaModal();
    } catch (err) {
      toast.error("Failed to save media.");
    }
  };

  const handleDeleteMedia = async (id: string) => {
    setDeletingMediaId(id);
    try {
      await deleteMedia(id).unwrap();
      toast.success("Media deleted.");
    } catch {
      toast.error("Failed to delete media.");
    } finally {
      setDeletingMediaId(null);
    }
  };

  // Render

  return (
    <>
      <section className="md:mx-8 mx-5 mt-8 space-y-6">
        {/* Categories Card */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Gallery Categories</CardTitle>
            <Button onClick={openCreateCat} className="flex items-center gap-2">
              <Plus size={16} />
              Add Category
            </Button>
          </div>
          <CardContent className="p-0">
            {loadingCats ? (
              <p className="text-sm text-gray-500 py-4">Loading…</p>
            ) : categories.length === 0 ? (
              <p className="text-sm text-gray-400 py-4">
                No categories yet. Click <strong>Add Category</strong> to get
                started.
              </p>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Media count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell className="font-medium">
                          {cat.name}
                        </TableCell>
                        <TableCell className="text-gray-500 max-w-xs truncate">
                          {cat.description || "—"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {cat.media_count}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditCat(cat)}
                              className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteCat(cat.id)}
                              disabled={deletingCat && deletingCatId === cat.id}
                              className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Media Card */}

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Gallery Media</CardTitle>
            <Button
              onClick={openCreateMedia}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Media
            </Button>
          </div>
          <CardContent className="p-0">
            {loadingMedia ? (
              <p className="text-sm text-gray-500 py-4">Loading…</p>
            ) : mediaList.length === 0 ? (
              <p className="text-sm text-gray-400 py-4">
                No media yet. Click <strong>Add Media</strong> to get started.
              </p>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Preview</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead>Uploaded by</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mediaList.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="w-12 h-12 rounded object-cover border"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {item.category_name}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.is_public
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.is_public ? "Public" : "Private"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          {item.uploaded_by_name}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditMedia(item)}
                              className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(item.id)}
                              disabled={
                                deletingMedia && deletingMediaId === item.id
                              }
                              className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Category Modal */}
      {catModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeCatModal}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative z-10 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderOpen size={18} />
                  {catMode === "create" ? "Add Category" : "Edit Category"}
                </CardTitle>
                <button
                  onClick={closeCatModal}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <CardContent className="p-0">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="cat_name">Name</FieldLabel>
                    <Input
                      id="cat_name"
                      name="name"
                      type="text"
                      placeholder="e.g. Events, Programs"
                      value={catForm.name}
                      onChange={handleCateChange}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="cat_description">
                      Description
                    </FieldLabel>
                    <textarea
                      id="cat_description"
                      name="description"
                      rows={3}
                      placeholder="Brief description…"
                      value={catForm.description}
                      onChange={handleCateChange}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </Field>
                </FieldGroup>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeCatModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleCatSubmit} disabled={isCatBusy}>
                    {isCatBusy
                      ? "Saving…"
                      : catMode === "create"
                        ? "Save Category"
                        : "Update Category"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Media Modal */}

      {mediaModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeMediaModal}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative z-10 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image size={18} />
                  {mediaMode === "create" ? "Add Media" : "Edit Media"}
                </CardTitle>
                <button
                  onClick={closeMediaModal}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <CardContent className="p-0">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="media_category">Category</FieldLabel>
                    <select
                      id="media_category"
                      name="category"
                      value={mediaForm.category}
                      onChange={handleMediaChange}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="media_title">Title</FieldLabel>
                    <Input
                      id="media_title"
                      name="title"
                      type="text"
                      placeholder="e.g. Opening ceremony 2024"
                      value={mediaForm.title}
                      onChange={handleMediaChange}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="media_description">
                      Description
                    </FieldLabel>
                    <textarea
                      id="media_description"
                      name="description"
                      rows={2}
                      placeholder="Optional description…"
                      value={mediaForm.description}
                      onChange={handleMediaChange}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="media_url">
                      Media file
                      {mediaMode === "edit" && (
                        <span className="text-gray-400 font-normal ml-1">
                          (leave blank to keep current)
                        </span>
                      )}
                    </FieldLabel>
                    {mediaPreview && (
                      <img
                        src={mediaPreview}
                        alt="Preview"
                        className="w-24 h-24 rounded-lg object-cover border mb-2"
                      />
                    )}
                    <Input
                      id="media_url"
                      name="media_url"
                      type="file"
                      accept="image/*,video/*"
                      ref={mediaFileRef}
                      onChange={handleMediaChange}
                    />
                  </Field>
                  <div className="flex items-center gap-3 py-1">
                    <input
                      id="is_public"
                      name="is_public"
                      type="checkbox"
                      checked={mediaForm.is_public}
                      onChange={handleMediaChange}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                    <label
                      htmlFor="is_public"
                      className="text-sm font-medium text-gray-700"
                    >
                      Make public
                    </label>
                  </div>
                </FieldGroup>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={closeMediaModal}>
                    Cancel
                  </Button>
                  <Button onClick={handleMediaSubmit} disabled={isMediaBusy}>
                    {isMediaBusy
                      ? "Saving…"
                      : mediaMode === "create"
                        ? "Upload Media"
                        : "Update Media"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
