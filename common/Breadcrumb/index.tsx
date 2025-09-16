import Link from "next/link";

export interface BreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: string;
    className?: string;
}

const Breadcrumb = ({
    items,
    separator = "/",
    className = "flex mb-4 text-sm",
}: BreadcrumbProps) => {
    return (
        <nav className={className} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center m-0">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-900 font-medium" aria-current="page">
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <span className="mx-2 text-gray-400 select-none">{separator}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
