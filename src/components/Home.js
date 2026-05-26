import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const cards = [
        {
            title: "👥 Members",
            desc: "Manage participants",
            path: "/members"
        },
        {
            title: "🎭 Juries",
            desc: "Manage judges",
            path: "/juries"
        },
        {
            title: "🏆 Contests",
            desc: "Manage competitions",
            path: "/contests"
        },
        {
            title: "📂 Categories",
            desc: "Manage categories",
            path: "/categories"
        }
    ];

    return (
        <div className="container py-5">

            {/* HERO */}
            <div className="text-center mb-5">
                <h1 className="fw-bold display-5">
                    {t("STAGE SCORE")}
                </h1>
                <p className="text-muted">
                    Admin dashboard for managing system
                </p>
            </div>

            {/* CARDS */}
            <div className="row g-4">

                {cards.map((item, index) => (
                    <div className="col-md-3" key={index}>
                        <div
                            className="card shadow-sm border-0 h-100 dashboard-card"
                            onClick={() => navigate(item.path)}
                        >
                            <div className="card-body d-flex flex-column justify-content-center text-center">

                                <div className="card-icon mb-2">
                                    {item.title.split(" ")[0]}
                                </div>

                                <h6 className="fw-bold mb-1">
                                    {item.title.split(" ").slice(1).join(" ")}
                                </h6>

                                <p className="text-muted mb-0 small">
                                    {item.desc}
                                </p>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Home;