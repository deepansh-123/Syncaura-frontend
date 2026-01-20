import { Eye } from "lucide-react";

export default function ComplaintsList({
  COMPLAINTS,
  activeId,
  setActiveId,
  statusStyle,
  statusIcon,
}) {
 const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};



  return (
    <>
      <div className="hidden md:flex flex-col gap-2 h-[calc(100vh-180px)]">
        <div className="grid grid-cols-11 place-items-center px-5 xl:px-15 2xl:px-20 py-4
          border border-[#8a858560] dark:border-[#575757] gap-x-2 sticky top-0
          bg-white dark:bg-[#2E2F2F] transition-colors duration-500 z-10">
          <div className="text-sm xl:text-lg font-semibold uppercase col-span-2 text-[#000000] dark:text-[#FFFFFF]">
            complaint id
          </div>
          <div className="text-sm flex items-center justify-start w-full xl:text-lg font-semibold uppercase col-span-4 text-[#000000] dark:text-[#FFFFFF]">
            subject/category
          </div>
          <div className="text-sm xl:text-lg font-semibold uppercase col-span-2 text-[#000000] dark:text-[#FFFFFF]">
            date
          </div>
          <div className="text-sm xl:text-lg font-semibold uppercase col-span-2 text-[#000000] dark:text-[#FFFFFF]">
            status
          </div>
          <div className="text-sm xl:text-lg font-semibold uppercase col-span-1 text-[#000000] dark:text-[#FFFFFF]">
            actions
          </div>
        </div>

        <div className="flex flex-col overflow-y-auto no-scrollbar">
          {COMPLAINTS.map(({ id, subject, status, category, date }, idx) => (
            <div
              onClick={() => setActiveId(id)}
              key={idx}
              className={`relative grid py-5 grid-cols-11 px-5 xl:px-15 2xl:px-20 gap-x-2 place-items-center
                transition-all duration-300
                ${
                  activeId === id
                    ? "bg-[#E2EBFF] dark:bg-[#1C3939]"
                    : "hover:bg-[#e2ebff75] dark:hover:bg-[#1d3333] hover:scale-[1.005]"
                }`}
            >
              <span
                className={`absolute  left-0 top-0 h-full w-1 bg-blue-500 dark:bg-gray-400 transition-transform duration-300
                  ${ 
                    activeId === id
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
              />

              <div className="text-sm flex items-center justify-center w-full font-semibold uppercase col-span-2 text-[#000000] dark:text-[#FFFFFF]">
                {id}
              </div>

              <div className="text-sm w-full flex items-center col-span-4 text-[#000000] dark:text-[#FFFFFF]">
                <div className="flex flex-col items-start justify-start">
                  <span className="uppercase font-semibold">{subject}</span>
                  <span className="text-xs">{category}</span>
                </div>
              </div>

              <div className="text-sm flex items-center justify-center w-full font-semibold uppercase col-span-2 text-[#000000] dark:text-[#FFFFFF]">
                {formatDate(date)}
              </div>

              <div className="text-xs flex items-center justify-center w-full font-semibold col-span-2 text-[#000000] dark:text-[#FFFFFF]">
                <div
                  className={`flex items-center gap-2 justify-center py-2 rounded-2xl px-4 ${statusStyle(
                    status.toLowerCase()
                  )}`}
                >
                  {statusIcon(status.toLowerCase())}
                  <span>{status}</span>
                </div>
              </div>

              <div className="text-sm flex items-center justify-center w-full font-semibold col-span-1 text-[#000000] dark:text-[#FFFFFF]">
                <Eye className="text-xl text-black dark:text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex md:hidden flex-col gap-4 px-2 sm:px-5
        max-h-[calc(100vh-120px)] overflow-y-auto
        no-scrollbar pb-25 pt-5 sm:py-0"
      >
        {COMPLAINTS.map(({ id, subject, category, status, date }, idx) => (
          <div
            key={COMPLAINTS.length + idx}
              onClick={() => setActiveId(id)}
            className="flex flex-col gap-5 px-5 py-5 shadow-[0_2px_6px_rgba(0,0,0,4)]
              dark:shadow-[0_2px_6px_rgba(0,0,0,3)]
              hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
              transition-shadow duration-200 rounded-2xl"
          >
            <div className="grid grid-cols-9 gap-5 place-items-start">
              <div className="uppercase text-[#000000] dark:text-[#FFFFFF] col-span-4 font-semibold text-base">
                Complaint id
              </div>
              <div className="col-span-5 text-[#000000] dark:text-[#FFFFFF] text-sm">
                {id}
              </div>
            </div>

            <div className="grid grid-cols-9 gap-5 place-items-start">
              <div className="uppercase text-[#000000] dark:text-[#FFFFFF] col-span-4 font-semibold text-base">
                subject
              </div>
              <div className="col-span-5 text-[#000000] dark:text-[#FFFFFF] text-sm">
                {subject}
              </div>
            </div>

            <div className="grid grid-cols-9 gap-5 place-items-start">
              <div className="uppercase text-[#000000] dark:text-[#FFFFFF] col-span-4 font-semibold text-base">
                category
              </div>
              <div className="col-span-5 text-[#000000] dark:text-[#FFFFFF] text-sm">
                {category}
              </div>
            </div>

            <div className="grid grid-cols-9 gap-5 place-items-start">
              <div className="uppercase text-[#000000] dark:text-[#FFFFFF] col-span-4 font-semibold text-base">
                date
              </div>
              <div className="col-span-5 text-[#000000] dark:text-[#FFFFFF] text-sm">
                {formatDate(date)}
              </div>
            </div>

            <div className="grid grid-cols-9 gap-5 place-items-start">
              <div className="uppercase text-[#000000] dark:text-[#FFFFFF] col-span-4 font-semibold text-base">
                status
              </div>
              <div className="col-span-5 text-[#000000] dark:text-[#FFFFFF] text-sm">
                <div
                  className={`flex items-center gap-2 justify-center py-1 rounded-2xl px-4 ${statusStyle(
                    status.toLowerCase()
                  )}`}
                >
                  {statusIcon(status.toLowerCase())}
                  <span>{status}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-9 gap-5 place-items-start">
              <div className="uppercase text-[#000000] dark:text-[#FFFFFF] col-span-4 font-semibold text-base">
                action
              </div>
              <div className="col-span-5 text-[#000000] px-5  dark:text-[#FFFFFF] ">
                <Eye className="text-xl text-black dark:text-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
