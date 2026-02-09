import com_img_1 from "@/assets/communityInActionImg/com_img_1.jpg";
import com_img_2 from "@/assets/communityInActionImg/com_img_2.jpg";
import com_img_3 from "@/assets/communityInActionImg/com_img_3.jpg";
import com_img_4 from "@/assets/communityInActionImg/com_img_4.jpg";
import com_img_5 from "@/assets/communityInActionImg/com_img_5.jpg";
import com_img_6 from "@/assets/communityInActionImg/com_img_6.jpg";
import com_img_7 from "@/assets/communityInActionImg/com_img_7.jpg";

const communityImages = [
  {
    id: 1,
    src: com_img_1,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: com_img_2,
    className: "md:col-span-2",
  },
  {
    id: 3,
    src: com_img_3,
    className: "",
  },
  {
    id: 4,
    src: com_img_4,
    className: "",
  },
  {
    id: 5,
    src: com_img_5,
    className: "",
  },
  {
    id: 6,
    src: com_img_6,
    className: "",
  },
  {
    id: 7,
    src: com_img_7,
    className: "md:col-span-2",
  },
];

export const OurCommunityInAction = () => {
  return (
    <section className="bg-[#FAFAFA] px-6 py-14 md:px-16 lg:px-24 space-y-10">
      <div className="text-center text-[#0F3D2E] font-bold">
        Our Community in Action
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {communityImages.map((item) => (
          <div
            key={item.id}
            className={`overflow-hidden rounded-2xl ${item.className}`}
          >
            <img
              src={item.src}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
