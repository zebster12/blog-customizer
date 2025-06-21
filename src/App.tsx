import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form';
import { CSSProperties, useState } from 'react';
import { Article } from './components/article';
import './styles/index.module.scss';

interface ArticleState {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState(defaultArticleState);

	const setArticleState = (newState: ArticleState) => {
		setCurrentArticleState(newState);
	};

	return (
		<main
			className='main'
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentArticleState={currentArticleState}
				setCurrentArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};
