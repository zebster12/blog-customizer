import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useCloseOnOutsideClickOrEsc } from 'src/ui/select/hooks/UseCloseOnOutsideClickOrEsc';

interface ArticleParamsFormProps {
	currentArticleState: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	setCurrentArticleState: (state: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	}) => void;
}

export const ArticleParamsForm = ({
	currentArticleState: {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	},
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(fontFamilyOption);
	const [selectedSize, setSelectedSize] = useState(fontSizeOption);
	const [selectedColor, setSelectedColor] = useState(fontColor);
	const [selectedBackground, setSelectedBackground] = useState(backgroundColor);
	const [selectedWidth, setSelectedWidth] = useState(contentWidth);

	const elementRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsOpen((open) => !open);
	};

	useCloseOnOutsideClickOrEsc({
		isOpen,
		elementRef,
		onClose: handleClick,
	});

	const handleReset = () => {
		setCurrentArticleState(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setCurrentArticleState({
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedSize,
			fontColor: selectedColor,
			backgroundColor: selectedBackground,
			contentWidth: selectedWidth,
		});
	};

	return (
		<div ref={elementRef}>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			{isOpen && (
				<aside className={styles.container}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Select
							selected={selectedFont}
							options={fontFamilyOptions}
							onChange={setSelectedFont}
							title='Шрифт'
						/>
						<RadioGroup
							selected={selectedSize}
							options={fontSizeOptions}
							onChange={setSelectedSize}
							title='Размер шрифта'
							name='Размер текста'
						/>
						<Separator />
						<Select
							selected={selectedColor}
							options={fontColors}
							onChange={setSelectedColor}
							title='Цвет шрифта'
						/>
						<Select
							selected={selectedBackground}
							options={backgroundColors}
							onChange={setSelectedBackground}
							title='Цвет фона'
						/>
						<Select
							selected={selectedWidth}
							options={contentWidthArr}
							onChange={setSelectedWidth}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</div>
	);
};
