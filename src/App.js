/**
*   引入核心文件
*/
import React from 'react';
/**
*	引入主入口组件样式
*/
import './App.css';
/**
*	引入父组件
*/
import Father from './conponents/father-component.js';
/**
*	创建类组件
*/
class App extends React.Component {
	// 类组件模板必须通过render方法提供
	// render方法是固定的，提供渲染的组件
	render () {
		// 返回一个jsx元素
		return (
			// 这个组件的根节点
			<div>
				<Father></Father>
			</div>
		)
	}
};
/**
*	导出类组件
*/
export default App;
