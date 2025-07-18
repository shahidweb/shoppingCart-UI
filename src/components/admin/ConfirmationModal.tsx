import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <div
      id="deleteModal"
      tabIndex={-1}
      className={`${
        isOpen ? "flex" : "hidden"
      } bg-gray-900/50 fixed justify-center items-center md:inset-0`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent
             rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <XMarkIcon
              className="w-5 h-5 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              onClick={onClose}
            />
          </button>
          <TrashIcon className="w-11 h-11 inline  mb-3.5 mx-auto text-gray-400" />
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-3 cursor-pointer text-sm font-medium text-gray-500 
              bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
            <button
              type="submit"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="py-2 px-3 outline-0 cursor-pointer text-sm font-medium text-center text-white 
              bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none 
              focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
