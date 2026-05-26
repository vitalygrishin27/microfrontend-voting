import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

            {/* ЛОГО / HOME */}
            <Link to="/" className="navbar-brand fw-bold">
                STAGE SCORE
            </Link>

            {/* кнопка для мобилки */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#adminNavbar"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* меню */}
            <div className="collapse navbar-collapse" id="adminNavbar">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                        <Link className="nav-link" to="/members">
                            {t("Members")}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/juries">
                            {t("Juries")}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/contests">
                            {t("Contests")}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/categories">
                            {t("Categories")}
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/criteria">
                            {t("Criteria")}
                        </Link>
                    </li>

                </ul>

                {/* язык справа
                <select
                    className="form-select form-select-sm w-auto"
                    onChange={changeLanguage}
                    defaultValue="ua"
                >
                    <option value="ua">UA</option>
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>*/}

            </div>
        </nav>
    );
};

export default Navbar;