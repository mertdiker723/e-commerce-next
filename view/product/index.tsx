"use client";

import { useEffect } from "react";

const ProductPage = () => {
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        })();
    }, []);


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/retailers`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        })();
    }, []);
    

    return <div>Product Page</div>;
};

export default ProductPage;
