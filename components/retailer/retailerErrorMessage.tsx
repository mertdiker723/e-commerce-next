import { XCircleIcon } from "@heroicons/react/20/solid";

type RetailerErrorMessageProps = {
    errorMessage: string;
};

const RetailerErrorMessage = ({ errorMessage }: RetailerErrorMessageProps) => {
    if (!errorMessage) return null;

    return (
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">An Error Occurred</h3>
                    <p className="text-sm text-red-700 leading-relaxed">{errorMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default RetailerErrorMessage;
