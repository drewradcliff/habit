import clsx from "clsx";
import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getRecords } from "../apis";
import Layout from "../components/Layout";
import Tooltip from "../components/Tooltip";

interface Activity {
  date: string;
  count: number;
}

const Year: NextPage = () => {
  const { data } = useQuery<Activity[]>("activity", getRecords);
  const router = useRouter();

  const getColor = (count: number) => {
    if (!count) return "bg-gray-200 dark:bg-gray-700";
    if (count < 4) return "bg-green-300 dark:bg-green-900";
    if (count < 6) return "bg-green-500 dark:bg-green-700";
    if (count < 10) return "bg-green-700 dark:bg-green-500";
    if (count >= 10) return "bg-green-900 dark:bg-green-300";
  };

  const handleClick = (date: string) => {
    router.push(`/${date}`);
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Last Year</h1>
        </div>
        <div className="flex md:flex-col max-w-[100px] mx-auto max-h-full flex-wrap md:max-h-[120px] mt-12 md:w-full content-center">
          {data?.map(({ count, date }) => (
            <Tooltip
              key={date}
              content={`${count} completed on ${moment(date).format(
                "MMM D, YYYY"
              )}`}
            >
              <div
                onClick={() => handleClick(date)}
                className={clsx(
                  "h-[12px] w-[12px] m-[2px] rounded-sm cursor-pointer",
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
