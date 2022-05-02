import clsx from "clsx";
import moment from "moment";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { getActivity } from "../apis";
import Layout from "../components/Layout";
import Tooltip from "../components/Tooltip";

interface Activity {
  date: string;
  count: number;
}

const Year: NextPage = () => {
  const { data } = useQuery<Activity[]>("activity", getActivity);

  const getColor = (count: number) => {
    if (!count) return "bg-gray-100";
    if (count < 4) return "bg-green-300";
    if (count < 6) return "bg-green-500";
    if (count < 10) return "bg-green-700";
    if (count >= 10) return "bg-green-900";
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Last Year</h1>
        </div>
        <div className="flex flex-col flex-wrap max-h-[120px] mt-12 w-full content-center">
          {data?.map(({ count, date }) => (
            <Tooltip
              key={date}
              content={`${count} completed on ${moment(date).format(
                "MMM D, YYYY"
              )}`}
            >
              <div
                className={clsx(
                  "h-[12px] w-[12px] m-[2px] rounded-sm",
                  getColor(count)
                )}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Year;
