/**
*	表单详情
*/
/**
*	引入React核心文件
*/
import React from 'react';
// 创建类组件
class FormDetails extends React.Component {
	// 调用父类构造函数，并传参
	constructor (props) {
		// 构造函数中第一行代码必须是super
		super(props);
		// this前面必须添加super
		// state中定义该组件的私有状态，是响应式的；函数组件中定义的状态不是响应式的，所以说函数组件没有私有状态
		this.state = {
			// 用户名
			uname: '',
			// 职业
			job: '',
			// 性别
			gender: 'male',
			// 爱好
			favour: [],
			// 个人简介
			synopsis: ''
		};
		// 改变方法内部this指向
		this.handleuname = this.handleuname.bind(this);
		this.handlejob = this.handlejob.bind(this);
		this.handlegender = this.handlegender.bind(this);
		this.handleFavour = this.handleFavour.bind(this);
		this.handlesynopsis = this.handlesynopsis.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handle = this.handle.bind(this);
	}
	// 用户名双向绑定
	handleuname = function (event) {
		this.setState({
			uname: event.target.value
		});
	}
	// 职业双向绑定
	handlejob = function (event) {
		this.setState({
			job: event.target.value
		});
	}
	// 性别双向绑定
	handlegender = function (event) {
		// 这个event是合成的，包含原有的event
		this.setState({
			gender: event.target.value
		}, () => {
			console.log(this.state.gender);
		});
	}
	// 爱好双向绑定
	handleFavour = function (event) {
		// 需要判断数组中是否已存在，来进行下一步操作
		// 1. 复制一份数据
		let favourarr = [...this.state.favour];
		// 2. 便利查找数据中是否存在该值
		let index = favourarr.findIndex(item => {
			return item === event.target.value
		});
		// 判断
		if (index !== -1) {
			// 存在则从数组中删除该项
			favourarr.splice(index, 1);
		} else {
			// 不存在则添加
			favourarr.push(event.target.value);
		};
		// 调用setState改变状态
		this.setState({
			favour: [...favourarr]
		}, () => {
			console.log(this.state.favour);
		});
	}
	// 个人简介双向绑定
	handlesynopsis = function (event) {
		this.setState({
			synopsis: event.target.value
		});
	}
	// 通用绑定方式
	handle = function (event) {
		this.setState({
			[event.target.id]: event.target.value
		})
	}
	// 点击提交
	handleSubmit = function (event) {
		// 个人简介
		console.log(this.state.synopsis);
		// 用户名
		console.log(this.state.uname);
		// 职业
		console.log(this.state.job);
	}
	// 类组件模板通过render提供
	// render是固定写法，提供渲染的模板
	render () {
		// 返回模板
		return (
			<div>
				<div>表单详情</div>
				<div>
					<label htmlFor="uname">用户名：</label>
					{/*label标签通过htmlFor属性绑定input的ID来实现点击文字获取光标效果*/}
					{/*输入框的type类型是text*/}
					{/*输入框完成双向绑定，value需要设定为私有状态中的值，onChange绑定的事件中，要让私有状态中的值等于输入框输入的值*/}
					<input type="text" id="uname" value={ this.state.uname } onChange={ this.handle }/>
				</div>
				<div>
					<label htmlFor="job">职业</label>
					{/*下拉选项双向绑定，value需要设定为私有状态中的值，onChange绑定的事件中，要让私有状态中的值等于选中项的value，select的值自动等于选中项value的值*/}
					<select id="job" value={ this.state.job } onChange={ this.handle }>
						<option value="code">程序员</option>
						<option value="sportsman">运动员</option>
						<option value="pilot">飞行员</option>
					</select>
				</div>
				<div>
					<span>性别</span>
					<label htmlFor="male">男</label>
					{/*单选框的name属性值必须设置，并且要设置成同一个，表示他们是同一类，这样才能实现单选效果*/}
					{/*每一项的value值是固定的;同一类单选框，onChange事件要绑定同一个方法*/}
					{/*checked的选中状态，根据私有状态中的值做判断*/}
					<input name="gender" id="male" value="male" onChange={ this.handlegender } checked={ this.state.gender === 'male' ? true : '' } type="radio"/>
					<label htmlFor="female">女</label>
					<input name="gender" id="female" value="female" onChange={ this.handlegender } checked={ this.state.gender === 'female' ? true : '' } type="radio"/>
				</div>
				<div>
					<span>爱好</span>
					{/*多选框的name值相同，表示他们是同一类，提交时name值作为提交的数组名称，他并没有更多的作用了*/}
					{/*每一项的value值是固定的，同一类多选框，onChange事件要绑定同一个方法*/}
					{/*checked的选中状态，根据私有状态中的值做判断*/}
					{/*私有状态中是需要添加还是删除点击的值，需要作进一步处理*/}
					<label htmlFor="sing">唱歌</label>
					<input type="checkbox" name="favour" id="sing" value="singing" onChange={ this.handleFavour }/>
					<label htmlFor="code">敲代码</label>
					<input type="checkbox" name="favour" id="code" value="coding" onChange={ this.handleFavour }/>
					<label htmlFor="dance">跳舞</label>
					<input type="checkbox" name="favour" id="dance" value="dancing" onChange={ this.handleFavour }/>
				</div>
				<div>
					<label htmlFor="synopsis">个人简介</label>
					{/*多行输入框完成双向绑定，value需要设定为私有状态中的值，onChange绑定的事件中，要让私有状态中的值等于输入框输入的值*/}
					<textarea value={ this.state.synopsis } onChange={ this.handle } id="synopsis" cols="30" rows="10"></textarea>
				</div>
				<div>
					<button onClick={ this.handleSubmit }>提交</button>
				</div>
			</div>
		)
	}
}
/**
*	导出类组件
*/
export default FormDetails;
