import { Suspense } from "react";
import FavoritePage from "@/view/favorite";

const Favorites = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FavoritePage />
        </Suspense>
    );
};

export default Favorites;
