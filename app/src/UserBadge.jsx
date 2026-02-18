import { useUser } from "./UserContext";

export default function UserBadge() {
    const { user } = useUser();
    if (!user) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "14px",
                right: "20px",
                zIndex: 9999,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                padding: "5px 14px",
                fontSize: "0.75rem",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.88)",
                pointerEvents: "none",
                userSelect: "none",
                whiteSpace: "nowrap",
            }}
        >
            {user.username} &nbsp;|&nbsp; Age: {user.age}
        </div>
    );
}
