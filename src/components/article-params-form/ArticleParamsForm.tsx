import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type props = {
	btnClick: (
		font: string,
		size: string,
		color: string,
		background: string,
		width: string
	) => void | undefined;
};

export const ArticleParamsForm = (props: props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(fontFamilyOptions[0]);
	const [selectedSize, setSelectedSize] = useState(fontSizeOptions[0]);
	const [selectedColor, setSelectedColor] = useState(fontColors[0]);
	const [selectedBackground, setSelectedBackground] = useState(
		backgroundColors[0]
	);
	const [selectedWidth, setSelectedWidth] = useState(contentWidthArr[0]);

	const rootRef = useRef<HTMLDivElement>(null);

	function handleClick() {
		setIsOpen((open) => !open);
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	function handleReset() {
		setSelectedFont(fontFamilyOptions[0]);
		setSelectedSize(fontSizeOptions[0]);
		setSelectedColor(fontColors[0]);
		setSelectedBackground(backgroundColors[0]);
		setSelectedWidth(contentWidthArr[0]);
		props.btnClick(
			fontFamilyOptions[0].value,
			fontSizeOptions[0].value,
			fontColors[0].value,
			backgroundColors[0].value,
			contentWidthArr[0].value
		);
	}
	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isOpen} onClick={handleClick} />
				{isOpen && (
					<aside className={styles.container}>
						<form
							className={styles.form}
							onSubmit={(event) => {
								event.preventDefault();
								props.btnClick(
									selectedFont.value,
									selectedSize.value,
									selectedColor.value,
									selectedBackground.value,
									selectedWidth.value
								);
							}}
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
		</>
	);
};
