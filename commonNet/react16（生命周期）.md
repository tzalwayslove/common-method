旧的生命周期函数中
Mounting（加载阶段：涉及 6 个钩子函数）

1.constructor()
加载的时候调用一次，可以初始化 state

2.getDefaultProps()
设置默认的 props，也可以用 dufaultProps 设置组件的默认属性。

3.getInitialState()
初始化 state，可以直接在 constructor 中定义 this.state

4.componentWillMount()
组件加载时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修state

5.render()
react 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行

6.componentDidMount()
组件渲染之后调用，只调用一次


Updating（更新阶段：涉及5个钩子函数)
1.componentWillReceivePorps(nextProps)
组件加载时不调用，组件接受新的props时调用

2.shouldComponentUpdate(nextProps, nextState)
组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）

3.componentWillUpdata(nextProps, nextState)
组件加载时不调用，只有在组件将要更新时才调用，此时可以修改state

4.render()
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

5.componentDidUpdate()
组件加载时不调用，组件更新完成后调用

Unmounting（卸载阶段：涉及1个钩子函数）
1.componentWillUnmount()
组件渲染之后调用，只调用一次


-------------------------分割线------------------------------------

在react更新至react16时 对原来的生命周期进行了更新 现在的生命周期如下
Mounting（加载阶段：涉及4个钩子函数）
1.constructor()
加载的时候调用一次，可以初始化state

2.static getDerivedStateFromProps(props, state)
组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

3.render()
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

4.componentDidMount()
组件渲染之后调用，只调用一次

Updating（更新阶段：涉及5个钩子函数)
1.static getDerivedStateFromProps(props, state)
组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

2.shouldComponentUpdate(nextProps, nextState)
组件接收到新的props或者state时调用，return true就会更新dom（使用diff算法更新），return false能阻止更新（不调用render）

3.render()
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

4.getSnapshotBeforeUpdate(prevProps, prevState)
触发时间: update发生的时候，在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法

5.componentDidUpdate()
组件加载时不调用，组件更新完成后调用

Unmounting（卸载阶段：涉及1个钩子函数）
1.componentWillUnmount()
组件渲染之后调用，只调用一次

Error Handling(错误处理)
1.componentDidCatch(error，info)
任何一处的javascript报错会触发



-----------------------总结--------------------------------------
1.React16新的生命周期弃用了componentWillMount、componentWillReceivePorps，componentWillUpdate
2.新增了getDerivedStateFromProps、getSnapshotBeforeUpdate来代替弃用的三个钩子函数（componentWillMount、componentWillReceivePorps，componentWillUpdate）
3.React16并没有删除这三个钩子函数，但是不能和新增的钩子函数（getDerivedStateFromProps、getSnapshotBeforeUpdate）混用，React17将会删除componentWillMount、componentWillReceivePorps，componentWillUpdate
4.新增了对错误的处理（componentDidCatch）


--------------------------示例用法------------------------------------
1.static getDerivedStateFromProps()

当本地state需要根据props来改变的时候可调用此方法。

这个方法是在render()前会被执行，只要执行render()都会被在之前被触发。

该方法有两个参数props和state; 返回值为state对象, 不需要返回整体state，把需要改变的state返回即可。

示例：

static getDerivedStateFromProps(props, state) {
  if(props.color !== state.color) {
    return {color: props.color};
  }
}

2.shouldComponentUpdate()

此方法有两个参数：shouldComponentUpdate(nextProps, nextState).

返回值为true或者false, 默认返回true.

主要使用它来控制组件要不要渲然，常用作性能优化。

触发此方法的条件是：组件接收任意props或者state时都会被调用。需要注意的是在第一次render()时和在调用forceUpdate()时都不会被触发。

示例：

shouldComponentUpdate(nextProps, nextState) {
  if(nextProps.color !== this.props.color || nextState.size !== this.state.size) {
    return true;
  } 
  return false;
}