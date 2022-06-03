import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Navbar = () => {
    const {t, i18n} = useTranslation()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div className={"col-md-12 bg-dark py-2"}>
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/" className="navbar-brand mx-5">{t("Main")}</Link>

                <div className="mx-3" style={{"textAlign": "right", "display":"inline-block"}}>
                    <Link to={"/members"} className={"btn btn-outline-dark text-white"}>{t("Members")}</Link>
                    <Link to={"/juries"} className={"btn btn-outline-dark text-white"}>{t("Juries")}</Link>
                    <Link to={"/contests"} className={"btn btn-outline-dark text-white"}>{t("Contests")}</Link>
                    <Link to={"/categories"} className={"btn btn-outline-dark text-white"}>{t("Categories")}</Link>
                    <Link to={"/criteria"} className={"btn btn-outline-dark text-white"}>{t("Criteria")}</Link>
                    <div className="mx-3" style={{"display":"inline-block"}}>
                        <select id={"language"} onChange={(e) => changeLanguage(e.target.value)} defaultValue={"UA"}>
                            <option value={"ua"}>UA</option>
                            <option value={"en"}>EN</option>
                            <option value={"ru"}>RU</option>
                        </select>
                    </div>
                </div>
            </nav>
        </div>

    );
};
export default Navbar;