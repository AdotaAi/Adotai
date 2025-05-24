import styles from './styles.module.css';
import { User, PawPrint, BookmarkSimple, HandHeart } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface BottomTabBarProps {
    currentPage: string,
    variant?: string
}
export function BottomTabBar({ currentPage, variant }: BottomTabBarProps) {
    const navigate = useNavigate();

    return (
        <nav className={styles.container}>

            {
                variant === 'ong' ? (
                    <>
                        <User
                            size={32}
                            weight="fill"
                            className={currentPage === 'profile' ? styles.active : styles.inactive}
                            onClick={() => navigate('/ong')}
                        />

                        <PawPrint
                            size={32}
                            weight="fill"
                            className={currentPage === 'pets' ? styles.active : styles.inactive}
                            onClick={() => navigate('/pets')}
                        />

                        <HandHeart
                            size={32}
                            weight="fill"
                            className={currentPage === 'chat' ? styles.active : styles.inactive}
                            onClick={() => navigate('/ong-requests')}
                        />
                    </>
                ) : (
                    <>
                        <User
                            size={32}
                            weight="fill"
                            className={currentPage === 'profile' ? styles.active : styles.inactive}
                            onClick={() => navigate('/user')}
                        />


                        <PawPrint
                            size={32}
                            weight="fill"
                            className={currentPage === 'match' ? styles.active : styles.inactive}
                            onClick={() => navigate('/match')}
                        />


                        <BookmarkSimple
                            size={32}
                            weight="fill"
                            className={currentPage === 'favorites' ? styles.active : styles.inactive}
                            onClick={() => navigate('/saved')}
                        />


                        <HandHeart
                            size={32}
                            weight="fill"
                            className={currentPage === 'chat' ? styles.active : styles.inactive}
                            onClick={() => navigate('/requests')}
                        />
                    </>
                )
            }

        </nav>
    )
}