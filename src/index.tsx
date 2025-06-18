import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { defaultArticleState } from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption.value
	);
	const [selectedSize, setSelectedSize] = useState(
		defaultArticleState.fontSizeOption.value
	);
	const [selectedColor, setSelectedColor] = useState(
		defaultArticleState.fontColor.value
	);
	const [selectedBackground, setSelectedBackground] = useState(
		defaultArticleState.contentWidth.value
	);
	const [selectedWidth, setSelectedWidth] = useState(
		defaultArticleState.backgroundColor.value
	);

	function btnClick(
		font: string,
		size: string,
		color: string,
		background: string,
		width: string
	) {
		setSelectedFont(font);
		setSelectedSize(size);
		setSelectedColor(color);
		setSelectedBackground(background);
		setSelectedWidth(width);
		console.log(selectedColor, selectedWidth, selectedBackground);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedFont,
					'--font-size': selectedSize,
					'--font-color': selectedColor,
					'--container-width': selectedWidth,
					'--bg-color': selectedBackground,
				} as CSSProperties
			}>
			<ArticleParamsForm btnClick={btnClick} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
