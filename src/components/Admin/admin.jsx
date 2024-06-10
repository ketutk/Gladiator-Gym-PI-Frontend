import { useState } from "react";
import { Body } from "./body";
import { PaginationComponents } from "./pagination";
import { useEffect } from "react";
import { Dropdown, Table, Spinner } from "flowbite-react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { CreateAdmin } from "./createmember";
import { fetchAdmin } from "../../functions/API/fetchUser";
export const Admin = ({ token }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [name, setName] = useState("");
  const [debounceName, setDebounceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAdmin(`?page=${currentPage}&s=${debounceName}`, token);
        console.log(response);
        setItems(response.data.data.user);
        setTotalItems(response.data.data.total_items);
        setTotalPages(response.data.data.total_page);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (shouldRefetch) {
      fetchItems();
      setShouldRefetch(false);
    }
  }, [currentPage, shouldRefetch]);

  const debouncedSetName = useCallback(
    debounce((value) => {
      setDebounceName(value);
      setCurrentPage(1);
      setShouldRefetch(true);
    }, 1500), // Adjust the debounce delay as needed
    []
  );

  const onChangeName = (e) => {
    setName(e.target.value);
    setIsLoading(true);
    debouncedSetName(e.target.value);
  };
  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-4">Admin</h1>
      <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    placeholder="Search by name,email,or phone..."
                    value={name}
                    onChange={onChangeName}
                  />
                </div>
              </form>
            </div>
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <CreateAdmin setCurrentPage={setCurrentPage} setShouldRefetch={setShouldRefetch} setDebounceName={setDebounceName} />
            </div>
          </div>
          <div class="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>KTP_ID</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {isLoading && (
                  <Table.Row>
                    <Table.Cell colSpan={6}>
                      <div className="text-center">
                        <Spinner aria-label="Center-aligned spinner example" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
                {!isLoading && <Body data={items} setCurrentPage={setCurrentPage} setShouldRefetch={setShouldRefetch} token={token} />}
              </Table.Body>
            </Table>
          </div>
          <PaginationComponents currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} setShouldRefetch={setShouldRefetch} totalItems={totalItems} />
        </div>
      </div>
    </>
  );
};
