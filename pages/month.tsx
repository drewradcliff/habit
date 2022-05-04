import moment from "moment";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { getMonthHabits } from "../apis";
import { Checkbox } from "../components/Checkbox";
import Layout from "../components/Layout";

/*
  [
    { 
      activity: '🚴‍♀️' [
        { day: '2021-01-01', checked: true }
        { day: '2021-01-02', checked: false }
        { day: '2021-01-03', checked: false }
        { day: '2021-01-04', checked: false }
      ]
    }
  ]

*/

const Month: NextPage = () => {
  const { data } = useQuery("habits", () =>
    getMonthHabits(
      moment().startOf("month").toDate(),
      moment().endOf("month").toDate()
    )
  );

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">{moment().format("MMMM")}</h1>
        <div className="flex">
          {[...Array(moment().daysInMonth())].map(() => (
            <Checkbox checked={false} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Month;
