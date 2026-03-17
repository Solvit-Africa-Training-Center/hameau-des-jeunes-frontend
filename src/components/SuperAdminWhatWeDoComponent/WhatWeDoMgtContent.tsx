import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateWhatWeDoMutation,
  useDeleteWhatWeDoMutation,
  useGetWhatWeDoQuery,
  useUpdateWhatWeDoMutation,
} from "@/store/api/whatWeDoApi";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "react-toastify";

export const WhatWeDoMgtContent = () => {
  const { data, isLoading } = useGetWhatWeDoQuery();
  const [deleteItem] = useDeleteWhatWeDoMutation();
  const [createItem] = useCreateWhatWeDoMutation();
  const [updateItem] = useUpdateWhatWeDoMutation();

  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({ title: "", description: "" });
    setOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateItem({
          id: editingItem.id,
          title: form.title,
          description: form.description,
        }).unwrap();

        toast.success("Item updated successfully");
      } else {
        await createItem({
          title: form.title,
          description: form.description,
        }).unwrap();
        toast.success("Item created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id).unwrap();
      toast.success("Item deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="flex items-center justify-center md:mx-0 mx-3 mt-8">
      <Card className="p-5 md:w-3xl w-2xs">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">What We Do Management</CardTitle>

          <Button onClick={handleOpenCreate}>+ Add Item</Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {item.description}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (confirm("Delete this item?")) {
                          handleDelete(item.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* Modal (Popup with overlay) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Item" : "Create Item"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <Button className="w-full" onClick={handleSubmit}>
                {editingItem ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </section>
  );
};
