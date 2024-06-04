import { useState } from "react";
import { fetchMember } from "../../functions/API/fetchMember";
import { Body } from "./body";
import { PaginationComponents } from "./pagination";
import { useEffect } from "react";
import { Dropdown, Table, Spinner, Button } from "flowbite-react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { CreateMember } from "./createmember";
export const Member = ({ token }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [debounceName, setDebounceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchItems = async () => {
      const response = await fetchMember(`?page=${currentPage}&status=${status}&name=${debounceName}`, token);
      console.log(response);
      setItems(response.data.data.member);
      setTotalItems(response.data.data.total_items);
      setTotalPages(response.data.data.total_page);
      setIsLoading(false);
      setShouldRefetch(false);
    };
    fetchItems();
  }, [currentPage, status, debounceName, shouldRefetch]);

  const debouncedSetName = useCallback(
    debounce((value) => {
      setDebounceName(value);
      setCurrentPage(1);
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
      <h1 className="text-center font-bold text-4xl mb-4">Member</h1>
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
                    placeholder="Search"
                    value={name}
                    onChange={onChangeName}
                  />
                </div>
              </form>
            </div>
            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <CreateMember setCurrentPage={setCurrentPage} setShouldRefetch={setShouldRefetch} setDebounceName={setDebounceName} setStatus={setStatus} />
              <Button className="px-0 py-0 text-xs" color={"dark"} size={"xs"}>
                <Dropdown label={"Status"} dismissOnClick={false} className="px-0 py-0" color={""} size={"sm"}>
                  <Dropdown.Item>
                    <input
                      id="active"
                      name="membership-status"
                      type="radio"
                      value="true"
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      checked={status === "true" ? true : false}
                    />
                    <label for="active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      Active
                    </label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input
                      id="non-active"
                      name="membership-status"
                      type="radio"
                      value="false"
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      checked={status === "false" ? true : false}
                    />
                    <label for="non-active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      Non-active
                    </label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input
                      id="non-active"
                      name="membership-status"
                      type="radio"
                      value=""
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-gray-600 focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={(e) => {
                        setStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      checked={status === "" ? true : false}
                    />
                    <label for="non-active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      All
                    </label>
                  </Dropdown.Item>
                </Dropdown>
              </Button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
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
          <PaginationComponents currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={totalItems} />
        </div>
      </div>
    </>
  );
};
