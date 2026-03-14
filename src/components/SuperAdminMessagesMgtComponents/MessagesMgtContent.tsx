import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MailOpen, Trash2, X } from "lucide-react";
import { useGetMessageQuery ,useReadMessageMutation} from "@/store/api/message";
import {  useCreateReplyMessageMutation, type ReplyContactMessage} from "@/store/api/replyMessage";
import { useState } from "react";



export const MessagesMgtContent = () => {
  const [createReplyMessage] = useCreateReplyMessageMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [readMessage] = useReadMessageMutation();

  interface ContactMessage {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    replies:ReplyContactMessage[];
    message: string;
    is_read: boolean;
    created_at?: string;
    updated_at?: string;
  }
  const { data: messageList = [], isLoading: isFetching } =
    useGetMessageQuery();

  // Table columns config

  type ColumnKeys = "first_name" | "last_name" | "email" | "phone_number" | "created_at";

  const COLUMNS: { label: string; key: ColumnKeys }[] = [
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone_number" },
    { label: "Sent At", key: "created_at" },
  ];

  const handleDelete = async (id: string) => {
    // setDeletingId(id);
    // await deleteImpact(id);
    // toast.success("Impact record deleted.");
    // setDeletingId(null);
  };


  // Modal helpers


  const [formData, setFormData] = useState({
      reply: '',
      contact_message: '',
 
    });

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMessage(null);
    setFormData({
      reply: '',
      contact_message: '',
    });
  };
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);


 const handleChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


  const handleOpenMessage = (message: ContactMessage) => {
    if(!message.is_read){
      readMessage(message.id);
    }
    setSelectedMessage(message);
    setModalOpen(true);
  };




const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedMessage) return;

  try {
    await createReplyMessage({
      reply: formData.reply,
      contact_message: selectedMessage.id,
    }).unwrap();

    setFormData({ reply: "",contact_message:'' });
    closeModal();
  } catch (error) {
    console.error(error);
  }
};



  return (
    <>
      <section className="md:mx-8 mx-5 mt-8">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">Messages </CardTitle>

          </div>

          <CardContent className="p-0">

            {isFetching ? (
              <p className="text-sm text-gray-500 py-6 text-center">Loading…</p>
            ) : messageList.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                No messages yet.
              </p>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {COLUMNS.map((col) => (
                        <TableHead key={col.key} className="whitespace-nowrap">
                          {col.label}
                        </TableHead>
                      ))}
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messageList.map((record) => (
                      <TableRow
                        key={record.id}
                        className={`transition-colors ${!record.is_read
                          ? "bg-blue-50 hover:bg-blue-100 font-semibold"
                          : "hover:bg-gray-50 text-gray-600"
                          }`}
                      >
                        {COLUMNS.map((col) => (
                          <TableCell key={col.key} className="whitespace-nowrap">
                            {record[col.key] ?? "-"}
                          </TableCell>
                        ))}

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenMessage(record)}
                              className="p-1.5 rounded hover:bg-blue-100 text-blue-600 transition-colors"
                              title="Open"
                            >
                              <MailOpen size={15} />
                            </button>

                            <button
                              onClick={() => { }}
                              className="p-1.5 rounded hover:bg-red-100 text-red-500 transition-colors disabled:opacity-40"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>)}
          </CardContent>
        </Card>
      </section>


      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex text-gray-800 items-center justify-center"
          onClick={closeModal}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          <div
            className="relative z-10 w-full max-w-xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-5 py-4">
                <CardTitle className="text-lg">Message</CardTitle>

                <button
                  onClick={closeModal}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <CardContent className="p-5 space-y-5">
                {/* Sender info */}
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedMessage?.first_name} {selectedMessage?.last_name}
                  </p>

                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedMessage?.email}
                  </p>

                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedMessage?.phone_number}
                  </p>


                </div>

                {/* Message */}
                <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 h-64 overflow-y-auto">
                  {selectedMessage?.message}
                </div>
                <p className="text-gray-500 text-xs italic font-semibold">
                  <b >Message sent at </b>: {selectedMessage?.created_at
                    ? new Date(selectedMessage.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "-"}
                </p>
                 <div className="h-32 overflow-y-auto">
                  {selectedMessage?.replies.map((replyMessage:ReplyContactMessage) => (
                    <div key={replyMessage.id} className="border rounded-lg p-4 text-sm text-gray-700">
                      <p className="text-gray-700 text-sm">{replyMessage.reply_message}</p>
                      <p className="text-gray-500 text-xs italic font-semibold">{replyMessage.created_at
                        ? new Date(replyMessage.created_at).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "-"}</p>
                    </div>
                  ))}

                </div>

                {/* Reply */}
                <form onSubmit={handleSubmit} >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reply</label>
                  
                  <textarea
                    rows={4}
                    name="reply"
                    placeholder="Write your reply..."
                    value={formData.reply}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

               

                {/* Actions */}
                <div className="flex justify-between">
                  <button
                    onClick={() => { }}
                    className="text-red-500 hover:bg-red-50 px-3 py-2 rounded flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                  <div className="flex gap-3">

                    <button type="submit">
                      Reply
                    </button>
                  </div>
                </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

