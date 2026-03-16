import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateAboutUsMutation,
  useDeleteAboutUsMutation,
  useGetAboutUsQuery,
  usePatchAboutUsMutation,
  useUpdateAboutUsMutation,
} from "@/store/api/aboutUsApi";

interface FormState {
  our_story: string;
  our_mission: string;
  our_vision: string;
  banner_image: File | null;
}

const initialState: FormState = {
  our_story: "",
  our_mission: "",
  our_vision: "",
  banner_image: null,
};

export const AboutMgtContent = () => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [recordId, setRecordId] = useState<string | null>(null);

  const { data, isLoading: isFetching } = useGetAboutUsQuery();
  const about = data?.results?.[0];

  const [createAboutUs, { isLoading: isCreating }] = useCreateAboutUsMutation();
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();
  const [patchAboutUs, { isLoading: isPatching }] = usePatchAboutUsMutation();
  const [deleteAboutUs, { isLoading: isDeleting }] = useDeleteAboutUsMutation();

  const isSubmitting = isCreating || isUpdating || isPatching || isDeleting;

  useEffect(() => {
    if (data) {
      setRecordId(about?.id ?? null);
      setFormData({
        our_story: about?.our_story ?? "",
        our_mission: about?.our_mission ?? "",
        our_vision: about?.our_vision ?? "",
        banner_image: null,
      });
    }
  }, [data]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, keyof FormState> = {
      "our-story": "our_story",
      "our-mission": "our_mission",
      "our-vision": "our_vision",
    };
    setFormData((prev) => ({ ...prev, [fieldMap[id]]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, banner_image: file }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.banner_image) return toast.error("Banner image is required.");
    try {
      const result = await createAboutUs({
        our_story: formData.our_story,
        our_mission: formData.our_mission,
        our_vision: formData.our_vision,
        banner_image: formData.banner_image,
      }).unwrap();
      setRecordId(result.id);
      toast.success("About Us created successfully!");
    } catch (err) {
      console.error("Create failed:", err);
      toast.error("Failed to create. Please try again.");
    }
  };

  const handleFullUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordId) return;
    try {
      await updateAboutUs({
        id: recordId,
        our_story: formData.our_story,
        our_mission: formData.our_mission,
        our_vision: formData.our_vision,
        ...(formData.banner_image && { banner_image: formData.banner_image }),
      }).unwrap();
      toast.success("About Us updated successfully!");
    } catch (err) {
      console.error("Full update failed:", err);
      toast.error("Failed to update. Please try again.");
    }
  };

  const handlePatch = async () => {
    if (!recordId) return;
    try {
      await patchAboutUs({
        id: recordId,
        ...(formData.our_story && { our_story: formData.our_story }),
        ...(formData.our_mission && { our_mission: formData.our_mission }),
        ...(formData.our_vision && { our_vision: formData.our_vision }),
        ...(formData.banner_image && { banner_image: formData.banner_image }),
      }).unwrap();
      toast.success("About Us partially updated!");
    } catch (err) {
      console.error("Patch failed:", err);
      toast.error("Failed to patch. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!recordId) return;
    toast("Are you sure you want to delete this record?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteAboutUs(recordId).unwrap();
            setFormData(initialState);
            setRecordId(null);
            toast.success("About Us deleted successfully!");
          } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Failed to delete. Please try again.");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  const truncate = (text: string | undefined | null, length = 60) => {
    if (!text) return "—";
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  if (isFetching) return <p className="text-center mt-8">Loading...</p>;

  return (
    <section className="flex flex-col items-center justify-center md:mx-0 mx-3 mt-8 gap-8">
      {/* ── FORM CARD ── */}
      <Card className="p-3 md:w-3xl w-2xs">
        <CardTitle className="text-xl">About Us Data</CardTitle>
        <CardContent>
          <form onSubmit={recordId ? handleFullUpdate : handleCreate}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="our-story">Our Story</FieldLabel>
                <Textarea
                  id="our-story"
                  placeholder="Enter text"
                  value={formData.our_story}
                  onChange={handleTextChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="our-mission">Our Mission</FieldLabel>
                <Textarea
                  id="our-mission"
                  placeholder="Enter text"
                  value={formData.our_mission}
                  onChange={handleTextChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="our-vision">Our Vision</FieldLabel>
                <Textarea
                  id="our-vision"
                  placeholder="Enter text"
                  value={formData.our_vision}
                  onChange={handleTextChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="banner-image">Banner Image</FieldLabel>
                <Input
                  id="banner-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Field>

              <div className="flex gap-2 flex-wrap mt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isCreating
                    ? "Creating..."
                    : isUpdating
                      ? "Updating..."
                      : recordId
                        ? "Full Update"
                        : "Create"}
                </Button>

                {recordId && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={handlePatch}
                    >
                      {isPatching ? "Patching..." : "Partial Update"}
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isSubmitting}
                      onClick={handleDelete}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </>
                )}
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* ── DATA TABLE CARD ── */}
      {data && (
        <Card className="p-3 md:w-3xl w-2xs">
          <CardTitle className="text-xl mb-4">
            Current About Us Record
          </CardTitle>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Our Story</TableCell>
                  <TableCell className="text-muted-foreground">
                    {truncate(about?.our_story)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Our Mission</TableCell>
                  <TableCell className="text-muted-foreground">
                    {truncate(about?.our_mission)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Our Vision</TableCell>
                  <TableCell className="text-muted-foreground">
                    {truncate(about?.our_vision)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Banner Image</TableCell>
                  <TableCell>
                    {about?.banner_image ? (
                      <img
                        src={about?.banner_image}
                        alt="Banner"
                        className="h-12 w-24 object-cover rounded"
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
