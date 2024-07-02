import { Pagination } from "flowbite-react";
export const PaginationComponents = ({ currentPage, totalPages, setCurrentPage, setShouldRefetch, totalItems }) => {
  const onPageChange = (page) => {
    setCurrentPage(page);
    setShouldRefetch(true);
  };
  return (
    <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">10</span>
        &nbsp; of &nbsp;
        <span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
      </span>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} previousLabel="Sebelum" nextLabel="Selanjutnya" />
    </nav>
  );
};
