import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button1 from "../components/buttons/Button1";
import { getUsers, removeUser, useSorter } from "../helpers/crud";
import { setTitle } from "../helpers/site";
import { classNames } from "../helpers/ui";
import { UserModel } from "../types/model";

export const Home = (): any => {
  useEffect(() => {
    setTitle("Home");
  }, []);

  const { sorted, sort, remove, users } = useUserStore();

  return (
    <div className="container mx-auto">
      <section className="bg-white mx-4 lg:mx-auto max-w-6xl rounded-lg border mt-10 overflow-hidden shadow-lg shadow-blue-200">
        <div className="block w-full overflow-x-auto text-slate-500">
          <div className="flex items-center px-4 py-4 justify-between">
            <h3 className="font-bold text-lg text-slate-600">
              Registered users list
            </h3>
            <Link to="/register">
              <Button1>
                <i className="fas fa-add mr-1"></i>ADD
              </Button1>
            </Link>
          </div>
          <table className="items-center w-full bg-transparent border-collapse">
            <colgroup>
                <col className="w-20"/><col /><col /><col /><col /><col className="w-6" />
            </colgroup>
            <thead>
              <tr className="text-xs uppercase font-semibold bg-slate-50">
                <th
                  className={classNames([
                    "px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100 sortable",
                    { [sorted.order]: sorted.by === "id" },
                  ])}
                  onClick={() => sort("id")}
                >
                  No.
                </th>
                <th
                  className={classNames([
                    "px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100 sortable",
                    { [sorted.order]: sorted.by === "name" },
                  ])}
                  onClick={() => sort("name")}
                >
                  Name
                </th>
                <th
                  className={classNames([
                    "px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100 sortable",
                    { [sorted.order]: sorted.by === "email" },
                  ])}
                  onClick={() => sort("email")}
                >
                  Email
                </th>
                <th className="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100">
                  Profession
                </th>
                <th className="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100">
                  Uses
                </th>
                <th className="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100"></th>
              </tr>
            </thead>
            <tbody>
              {users.length == 0 ? (
                <tr>
                  <td colSpan={5}>
                    <p className="p-4 font-semibold text-red-500">
                      No user is added!
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr className="border-b" key={`user_tr_${idx}`}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                      {idx + 1}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                      {user.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4 uppercase">
                      {user.profession || "N/A"}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                      {user.uses?.join(", ") || "N/A"}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                      <button
                        className="text-red-400 hover:text-red-600"
                        onClick={() => remove(idx)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

function useUserStore() {
  let [sorted, sortBy] = useSorter<any>("name");
  let [users, setUsers] = useState<UserModel[]>(getUsers());
  const sort = (by: string) => {
    sorted = sortBy(by);
    if (by == "id") {
      if (sorted.order == "asc") {
        users = getUsers();
      } else {
        users = getUsers().reverse();
      }
    }else if (sorted.order == "asc") {
      //@ts-ignore
      users.sort((a: any, b: any) => {
        if (a[by] < b[by]) {
          return -1;
        }
        if (a[by] == b[by]) {
          return 0;
        }
        if (a[by] > b[by]) {
          return 1;
        }
      });
    } else {
      //@ts-ignore
      users.sort((a: any, b: any) => {
        if (a[by] > b[by]) {
          return -1;
        }
        if (a[by] == b[by]) {
          return 0;
        }
        if (a[by] < b[by]) {
          return 1;
        }
      });
    }
    setUsers([...users]);
  };
  const remove = (idx: number) => {
    removeUser(idx);
    users.splice(idx, 1);
    setUsers([...users]);
  };

  return { sort, sorted, remove, users };
}
