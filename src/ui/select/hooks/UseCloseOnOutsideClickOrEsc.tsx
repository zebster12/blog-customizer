import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEsc = {
	isOpen: boolean; // Флаг, открыт ли элемент (например, модальное окно или форма)
	onClose?: () => void; // Колбэк, вызываемый при закрытии
	elementRef: React.RefObject<HTMLDivElement>; // Ссылка на DOM-элемент, вне которого отслеживаем клик
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpen,
	elementRef,
	onClose,
}: UseCloseOnOutsideClickOrEsc) => {
	useEffect(() => {
		if (!isOpen) {
			// Если элемент закрыт, обработчики не нужны
			return;
		}

		const handleClick = (event: MouseEvent) => {
			// Если клик был вне элемента — вызываем onClose
			if (
				event.target instanceof Node &&
				!elementRef.current?.contains(event.target)
			) {
				onClose?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			// Закрытие по нажатию Escape
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		// Добавляем обработчики
		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		// Убираем обработчики при размонтировании или изменении зависимостей
		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, elementRef, onClose]);
};
