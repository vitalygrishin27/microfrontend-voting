import React from "react";
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} =useTranslation()

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mb-2 mt-2"}>
                    <h1 style={{"textAlign": "center"}}>{t("VOTING MANAGER")}</h1>
                </div>
            </div>
        </div>
    )
}
export default Home