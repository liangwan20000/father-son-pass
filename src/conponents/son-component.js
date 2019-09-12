/**
*	父子传值--子组件
*/
/**
*	引入React核心组件
*/
import React from 'react';
/**
*	基于类创建组件
*/
class Children extends React.Component {
	// 构造函数
	constructor (props) {
		// 向基础类传递值
		super(props);
		// 构造函数中this前必须添加super
		// state中定义组件的私有状态，是响应式的；函数组件中的私有状态不是响应式的，所以说函数组件没有私有状态
		this.state = {
			number: 1,
			addnum: 1
		};
		// 向方法add中添加this
		this.add = this.add.bind(this);
	}
	// 点击时number加1
	add = function () {
		// 状态修改必须使用setState
		this.setState({
			number: this.state.number + 1
		});
		// 结构出需要的函数
		let { summation } = this.props;
		// 利用函数将值传递给父组件
		summation(this.state.addnum);
	}
	// 类组件模板必须通过render方法提供
	// render方法是固定写法，提供要渲染的模板
	render () {
		// 返回jsx元素
		return (
			<div>
				<div>{ this.state.number }</div>
				<button onClick={this.add}>加</button>
			</div>
		)
	}
}
/**
*	导出类组件
*/
export default Children;
