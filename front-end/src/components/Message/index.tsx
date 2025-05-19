import styles from "./styles.module.css";

interface messageProps {
    children: string;
    variant: string
}

export function Message({ children, variant }: messageProps) {
    return (
        <div className={`${styles.container} ${styles[variant]}`}>
            <div>
                <p>{children}</p>
            </div>
        </div>
    )
}