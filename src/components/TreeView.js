import React from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'

let treeviewSpanStyle = {
  "width": "1rem",
  "height": "1rem"
};

let treeviewSpanIndentStyle = treeviewSpanStyle;
treeviewSpanIndentStyle["marginLeft"] = "10px";
treeviewSpanIndentStyle["marginRight"] = "10px";

let treeviewSpanIconStyle = treeviewSpanStyle;
treeviewSpanIconStyle["marginLeft"] = "10px";
treeviewSpanIconStyle["marginRight"] = "5px";

// 整体树
class TreeView extends React.Component {

    constructor(props) {
        super(props);

        //节点的数量
        this.nodesQuantity = 1;

        /*this.state = {data: props.data};
            this.someData = _.clone(props.data);
            this.setNodeId({nodes: this.state.data});*/
        this.state = {
            //_.clone是创建一个参数的影子，就是克隆一个一模一样的东西
            data: this.setNodeId(_.clone({nodes: props.data}))
        };
        this.findNodeById = this.findNodeById.bind(this);
        this.setChildrenState = this.setChildrenState.bind(this);
        this.setParentSelectable = this.setParentSelectable.bind(this);
        this.checkParentEmpty = this.checkParentEmpty.bind(this);
        this.nodeSelected = this.nodeSelected.bind(this);
        this.nodeDoubleClicked = this.nodeDoubleClicked.bind(this);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.setNodeId(_.clone({nodes: nextProps.data}))
            //这里除了传入data初始化数据之后，还需要传入该数据被选中的情况

        });
    }

    /**
     * 设置节点id
     * @param {*} node 
     */
    // setNodeId(node) {
    //     if (!node.nodes) return;

    //     //一开始对连续两个return的写法还看不懂，其实啦，它最后还是返回原来的形式，只不过通过对childNode进行再组织了而已
    //     return node.nodes.map(childNode => {
    //         return {
    //         nodeId: this.nodesQuantity++, //节点id
    //         nodes: this.setNodeId(childNode), //子节点
    //         parentNode: node,   //父节点
    //         //选中状态
    //         state: {    
    //             selected: childNode.state ? childNode.state.selected : false,
    //             expanded: childNode.state ? childNode.state.expanded : false
    //         },
    //         text: childNode.text, //节点文字
    //         icon: childNode.icon    //节点图标
    //         }
    //     });

    // }
    setNodeId(node,id=0) {
        if (!node.nodes) return;

        //一开始对连续两个return的写法还看不懂，其实啦，它最后还是返回原来的形式，只不过通过对childNode进行再组织了而已
        return node.nodes.map(childNode => {
            var nid = this.nodesQuantity++;
            return {
                nodeId: nid, //节点id
                nodes: this.setNodeId(childNode,nid), //子节点
                parentNode: id,   //父节点
                //选中状态
                state: {    
                    selected: childNode.state ? childNode.state.selected : false,
                    expanded: childNode.state ? childNode.state.expanded : false
                },
                text: childNode.text, //节点文字
                icon: childNode.icon    //节点图标
            }
             
        });

    }

    /**
     * 查询节点的id
     * @param {*} nodes 
     * @param {*} id 
     */
    findNodeById(nodes, id) {
        let _this = this;
        let result;
        if (nodes)
            nodes.forEach(function (node) {
                if (node.nodeId == id) result = node;
                else {
                    if (node.nodes) {
                    result = _this.findNodeById(node.nodes, id) || result;
                    }
                }
            });
        return result;
    }

    /**
     * 通过id删除节点
     * @param {*} obj 
     * @param {*} id 
     */
    deleteById(obj, id) {
        if (!obj || obj.length <= 0)
            return [];
        let arr = [];
        _.each(obj, (val) => {
            if (val.nodes && val.nodes.length > 0)
            val.nodes = this.deleteById(val.nodes, id);

            if (val.nodeId !== id) {
            arr.push(val);
            }
        });
        return arr;
    }

    /**
     * 设置子节点的状态
     * @param {*} nodes 
     * @param {*} state 
     */
    setChildrenState(nodes, state) {
        let _this = this;
        if (nodes)
            //说明一下，forEach与map的区别，都是遍历，一个是没有返回值，一个是重新组织数组，并返回
            nodes.forEach(function (node) {
                node.state.selected = state;
                _this.setChildrenState(node.nodes, state);
            });
    }

    /**
     * 设置父节点的选中状态
     * @param {*} node 
     */
    setParentSelectable(nid,selected) {
        // var _this = this
        //父节点没有,直接返回
        
        if (nid<1){
            return false
        }
        var tree = this.state.data
        //按照广度优先的原则，遍历整个数
        var t = function( tree, nid){
            var arr = []
            for(var i=0; i<tree.length; i++){
                if(tree[i].nodes){
                    for(var j=0; j<tree[i].nodes.length; j++){
                        if(tree[i].nodes[j].nodeId == nid){
                            return tree[i].nodeId
                        }
                        arr.push(tree[i].nodes[j])
                    }
                }
            }
            if(arr.length>0){
                return t( arr,nid )
            }
            return 0
        }
        var right = t(tree,nid)
        var fatherNd = {}
        if(right>0){
            var node = this.findNodeById(tree, right);
            //遍历node的子元素，如果子元素都被选中的话，父元素就会被选中
            if( node.nodes.every((ele)=>{ return ele.state.selected }) ){
                fatherNd = node
                node.state.selected = selected;
            }else{
                node.state.selected = false;
            }
            this.setState({data: this.state.data}); //设置本模块的状态

        }else{
            //right不大于0的话，父元素只能是为0，为0 意味着本身就是顶级元素，没有父元素
            return false
        }
                //如果父元素还有他自己的父元素呢
        if( t(tree,right) ){
            this.setParentSelectable(right,selected)
        }else{
            //已经是没有父元素了
            //返回本身的状态
            return fatherNd
        }

    }

    checkParentEmpty(node) {
        let parent = node.parentNode;
        if (!parent.state || !parent.state.selected)
            return;
        if (parent.nodes.every((childNode) =>  { return childNode.state.selected} )) {
            parent.state.selected = true;
            this.checkParentEmpty(parent);
        }else{
            parent.state.selected = false;
            this.checkParentEmpty(parent);
        }
    }
    

    //选择节点
    nodeSelected(nodeId, selected) {
        var self = this, s = self.state, p = self.props;
        let node = this.findNodeById(this.state.data, nodeId);
        node.state.selected = selected;
        var nid = node.nodeId
// node.parentNode.state.selected = selected
        // alert(   JSON.stringify(node)  )
        // alert(   JSON.stringify(this.state)  )
        // alert(   JSON.stringify( node.nodes )  )


        this.setChildrenState(node.nodes, selected); //设置子节点的状态  
        this.setState({data: this.state.data}); //设置本模块的状态
        //应该还有一个设置父节点的状态
        var fatherNd = this.setParentSelectable(nid,selected)
        // if(fatherNd){
        //     //有祖父节点，发送祖父节点
        //     fatherNd.nodes = []
        //     p.onWillDownItem( fatherNd.text )
        //     // this.props.onWillDownItem(fatherNd)
        //     this.props.dispatch(willDownItem(fatherNd))
        // }else{
        //     //没有father,就发送本身的节点
        //     // this.props.onWillDownItem(node)
        //     p.onWillDownItem( node.text )
        // }
        if (this.props.onClick)
            this.props.onClick(this.state.data, node);
    }

    nodeDoubleClicked(nodeId, selected) {
        let node = this.findNodeById(this.state.data, nodeId);
        if (this.props.onDoubleClick)
            this.props.onDoubleClick(this.state.data, node);
    }

    convert(obj) {
        if (!obj || obj.length <= 0)
            return [];
        return _.map(obj, (val) => {
            let treeNodeData = {
                text: val.text,
                selected: val.state.selected
            };
            let children = this.convert(val.nodes);
            if (children.length > 0)
                treeNodeData.nodes = children;
            return treeNodeData;
        });
    }

    /**
     * 增加节点，这里暂时用不到这些方法
     * @param {*} nodeId 
     * @param {*} text 
     */
    addNode(nodeId, text) {
        let node = this.findNodeById(this.state.data, nodeId);

        let newNode = {
            text: text,
            state: {},
            parentNode: node,
            nodeId: this.nodesQuantity++
        };

        if (node.nodes) {
            node.nodes.push(newNode)
        } else {
            node.nodes = [newNode]
        }

        console.log(this.convert(this.state.data));

        if (this.props.onNodeAdded)
            this.props.onNodeAdded(this.state.data);
    }
    /**
     * 移除节点，暂时用不到此方法
     * @param {*} nodeId 
     */
    removeNode(nodeId) {
        let newData = this.deleteById(_.clone(this.state.data), nodeId);
        if(newData.length === 0)
            return false;
        this.setState({data: newData});
        if (this.props.onNodeRemoved)
            this.props.onNodeRemoved(newData);
    }

    render() {
        let data = this.state.data;
        let children = [];
        if (data) {
            let _this = this;
            //数据导入,
            data.forEach(function (node) {
                children.push(React.createElement(TreeNode, {
                    node: node,
                    key: node.nodeId, //键
                    level: 1, //层级
                    visible: true,  //是否可见
                    onSelectedStatusChanged: _this.nodeSelected, //选中状态
                    onNodeDoubleClicked: _this.nodeDoubleClicked, //双击？
                    addNode: _this.addNode, //增加节点
                    removeNode: _this.removeNode, //移除节点
                    options: _this.props, //选项
                    nodes: _this.state.data, //子节点的数据
                    allowNew: _this.props.allowNew // ？
                }));
            });
        }

        return (
            <div classID="treeview" className="treeview">
                <ul className="list-group">
                {children}
                </ul>
            </div>
        )
    }
}

TreeView.propTypes = {
  levels: React.PropTypes.number,
  expandIcon: React.PropTypes.string,
  selectable: React.PropTypes.bool,

  emptyIcon: React.PropTypes.string,
  nodeIcon: React.PropTypes.string,

  color: React.PropTypes.string,
  backColor: React.PropTypes.string,
  borderColor: React.PropTypes.string,
  onhoverColor: React.PropTypes.string,
  selectedColor: React.PropTypes.string,
  selectedBackColor: React.PropTypes.string,

  enableLinks: React.PropTypes.bool,
  highlightSelected: React.PropTypes.bool,
  showBorder: React.PropTypes.bool,
  showTags: React.PropTypes.bool,

  nodes: React.PropTypes.arrayOf(React.PropTypes.object)
};

TreeView.defaultProps = {
  levels: 2,
  selectable: true,

  expandIcon: 'glyphicon glyphicon-plus',
  collapseIcon: 'glyphicon glyphicon-minus',
  emptyIcon: 'glyphicon',
  nodeIcon: 'glyphicon glyphicon-stop',
  unselectedIcon: 'glyphicon glyphicon-unchecked',
  selectedIcon: 'glyphicon glyphicon-check',

  color: "#428bca",
  backColor: undefined,
  borderColor: undefined,
  onhoverColor: '#F5F5F5',
  selectedColor: '#000000',
  selectedBackColor: '#FFFFFF',

  enableLinks: false,
  highlightSelected: true,
  showBorder: true,
  showTags: false,

  nodes: []
};

//树的节点
export class TreeNode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {node: props.node, expanded: true};
    /*this.expanded = (props.node.state && props.node.state.hasOwnProperty('expanded')) ?
     props.node.state.expanded :
     (this.props.level < this.props.options.levels);*/
    this.selected = (props.node.state && props.node.state.hasOwnProperty('selected')) ?
        true :
        false;
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.doubleClicked = this.doubleClicked.bind(this);
    this.newNodeForm = this.newNodeForm.bind(this);
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({node: nextProps.node, expanded: true});
    /*this.expanded = (nextProps.node.state && nextProps.node.state.hasOwnProperty('expanded')) ?
     nextProps.node.state.expanded :
     (this.props.level < this.props.options.levels);*/
    this.selected = (nextProps.node.state && nextProps.node.state.hasOwnProperty('selected')) ?
        nextProps.node.state.selected :
        false;
  }

  toggleExpanded(event) {
    this.setState({expanded: !this.state.expanded});
    event.stopPropagation();
  }

  toggleSelected(event) {
    let selected = !this.props.node.state.selected;
    this.props.onSelectedStatusChanged(this.state.node.nodeId, selected);
    event.stopPropagation();
  }

  doubleClicked(event) {
    let selected = !this.props.node.state.selected;
    this.props.onNodeDoubleClicked(this.state.node.nodeId, selected);
    event.stopPropagation(); //停止传播事件
  }

  newNodeForm(event) {
    this.setState({addNode: !this.state.addNode});
    event.stopPropagation();
  }

  addNode(event) {
    if (!new RegExp('^[a-zA-Z0-9]+$').test(this.refs.newNodeName.value)) {
      this.refs.newNodeName.setCustomValidity("Incorrect format");
      return false;
    }
    this.setState({addNode: false});
    console.log("ref", this.refs.newNodeName.value);
    this.props.addNode(this.state.node.nodeId, this.refs.newNodeName.value);
    this.setState({expanded: true});
    event.stopPropagation();
  }

  removeNode(event) {
    this.props.removeNode(this.state.node.nodeId);
    event.stopPropagation();
  }

  render() {
    let node = _.clone(this.props.node);
    let options = _.clone(this.props.options);

    let style;

    if(this.props.options.selectable) 
        node.icon = (node.state.selected) ? options.selectedIcon : options.unselectedIcon;

    if (!this.props.visible) {

      style = {
        display: 'none'
      };
    }
    else {

      if (options.highlightSelected && node.state.selected) {
        style = {
          color: options.selectedColor,
          backgroundColor: options.selectedBackColor
        };
      }
      else {
        style = {
          color: node.color || options.color,
          backgroundColor: node.backColor || options.backColor
        };
      }

      if (!options.showBorder) {
        style.border = 'none';
      }
      else if (options.borderColor) {
        style.border = '1px solid ' + options.borderColor;
      }
    }

    let indents = [];
    for (let i = 0; i < this.props.level - 1; i++) {
      indents.push(
          <span className={'indent'} style={treeviewSpanIndentStyle} key={i}> </span>
      )
    }

    let expandCollapseIcon;
    if (node.nodes) {
      if (!this.state.expanded) {
        expandCollapseIcon = (
            <span className={options.expandIcon} style={treeviewSpanStyle}
                  onClick={this.toggleExpanded}> </span>
        )
      }
      else {
        expandCollapseIcon = (
            <span className={options.collapseIcon} style={treeviewSpanStyle}
                  onClick={this.toggleExpanded}>   </span>
        )
      }
    }
    else {
      expandCollapseIcon = (
          <span className={options.emptyIcon} style={treeviewSpanStyle}> </span>
      )
    }

    let nodeIcon = (node.icon || options.nodeIcon) ? (
        <span className={'icon'} onClick={this.toggleSelected} style={treeviewSpanIconStyle}> <i
            className={node.icon || options.nodeIcon}> </i> </span>
    ) : "";

    let nodeText;
    if (options.enableLinks) {
      nodeText = (
          <a href={ node.href}> {node.text} </a>
      )
    }
    else {
      nodeText = (
          <span style={treeviewSpanStyle}> {node.text} </span>
      )
    }

    let badges;
    if (options.showTags && node.tags) {
      badges = node.tags.map(function (tag) {
        return (
            <span className={'badge'} style={treeviewSpanStyle}> {tag} </span>
        )
      });
    }

    let children = [];
    if (node.nodes) {
      let _this = this;
      node.nodes.forEach(function (node) {
        children.push(React.createElement(TreeNode, {
          node: node, //props传入的事件
          key: node.nodeId,
          level: _this.props.level + 1,
          visible: _this.state.expanded && _this.props.visible,
          onSelectedStatusChanged: _this.props.onSelectedStatusChanged,
          onNodeDoubleClicked: _this.props.onNodeDoubleClicked,
          addNode: _this.props.addNode,
          removeNode: _this.props.removeNode,
          options: options,
          allowNew: _this.props.allowNew
        }));
      });
    }

    let addButton = this.props.allowNew ? (
        <span className="glyphicon glyphicon-plus addElement" style={{float:"right", cursor:"pointer"}}
              onClick={this.newNodeForm}></span>) : "";

    let removeButton = this.props.options.removable ? (
        <span className="glyphicon glyphicon-remove removeElement" style={{cursor:"pointer"}}
              onClick={this.removeNode}></span>) : "";

    let newNode;

    if (this.state.addNode) {
      newNode = (<div className="input-group">
            <input type="text" className="form-control nodeName" ref="newNodeName"/>
          <span className="input-group-btn">
            <span className="btn btn-primary submitNode" onClick={this.addNode}>Add</span>
          </span>
          </div>
      );
    }

    style["cursor"] = "pointer";

    let treeNode = (
        <li className="list-group-item"
            style={style}
            onDoubleClick={this.doubleClicked}
            key={node.nodeId}>
          {indents}
          {expandCollapseIcon}
          {nodeIcon}
          {removeButton}
          {nodeText}
          {badges}
          {addButton}
          {newNode}
          {children}
        </li>
    );

    return (
        <ul>
          {treeNode}
        </ul>
    );
  }
}

export default TreeView;


/**
 * 发现一个问题：一
 * 子元素全部被选中，父元素应该会被自动选中，这个应该是一个自我的检查过程
 * 这样提交代码，就只需要提交父元素即可
 */

/**
 * 第一个增添的功能就是
 * 该组件选中了一个节点之后，查看兄弟节点是否全部被选中，如果全部选中，就将其上一级节点也选中，如果父节点的兄弟节点都被全部选中了，则将其祖父节点也选中，依次类推
 */

/**
 * 第二个增添的功能
 * 选中节点之后，发送该节点，如果其父节点也被选中，则发送其福节点，如果父节点的父节点也被选中，就发起祖父节点，以此类推
 */