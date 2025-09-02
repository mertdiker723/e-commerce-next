"use client";

import { Product } from "@/models/product.model";

import { SecondColumn } from "./SecondColumn";
import { FirstColumn } from "./FirstColumn";

interface TableProps {
    items: Product[];
    className?: string;
}

export const ProductTable = ({ items, className = "" }: TableProps) => {
    return (
        <div className={className}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {items && items.length > 0 ? (
                        items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex justify-between gap-x-4 p-6 hover:bg-gray-50 transition-colors duration-200 group">
                                        <FirstColumn item={item} />
                                        <SecondColumn item={item} />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p className="text-lg">No items found</p>
                            <p className="text-sm">Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
