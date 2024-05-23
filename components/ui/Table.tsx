import { Chapter } from "@prisma/client";
import Link from "next/link";

interface Item {
  [key: string | number]: any;
}

export const Table = ({
  rows,
  items,
  keys,
  href,
}: {
  rows: string[];
  items: Item[];
  keys: string[];
  href: string;
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {rows.map((row) => (
              <th scope="col" className="px-6 py-3" key={row}>
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: Item) => (
            <tr
              key={item.name}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {keys.map((row, index: number) => (
                <td key={item[row]} className="px-6 py-4">
                  {index === 0 ? (
                    <Link href={href + item.id}>{item[row]}</Link>
                  ) : (
                    item[row]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
