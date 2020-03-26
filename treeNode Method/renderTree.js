import React from 'react';
import { Tree, Icon } from 'antd';
import { formatMessage } from 'src/locale';
import { Menu, Item, Separator, Submenu, MenuProvider, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const TreeNode = Tree.TreeNode;
const types = [5, 6, 7, 8, 9, 10];
let LeafType: any = {};
types.map(item => {
  LeafType[item] = item;
});

export interface IAssetTreeState {}

class Index extends React.PureComponent<any> {
  private divTreetRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);

    this.divTreetRef = React.createRef();
  }

  // 弹出
  handleEvent = (item: any, e: any) => {
    const { onRightTreeNode } = this.props;
    onRightTreeNode(item.id);
    contextMenu.show({
      id: `menu_id${item.type}`,
      event: e,
    });
  };

  //递归数据生成子节点
  loop = (data: any) =>
    data &&
    data.map((item: any) => {
      let alarmLevel = item.alarmlevel == null ? 0 : item.alarmlevel;
      //停机
      let deviceState = '';
      if (item.runstate && item.runstate !== '0') {
        deviceState = '_1';
      }
      if (item.children) {
        return (
          <TreeNode
            title={
              <MenuProvider
                data={item}
                id={`menu_id${item.type}`}
                style={{ display: 'inline-block' }}
                onContextMenu={this.handleEvent.bind(null, item)}
              >
                <span className={'treeNodeDiv'} id={'node_' + item.id}>
                  <span
                    className={`DeviceTreeIcon DeviceTree_${item.type}_${alarmLevel}${deviceState}`}
                  />
                  <span>
                    {item.name}
                    {item.ip ? `(${item.ip})` : ''}
                  </span>
                </span>
              </MenuProvider>
            }
            key={item.id}
            dataRef={item}
            isLeaf={LeafType[item.type] !== undefined}
          >
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={
            <MenuProvider
              data={item}
              id={`menu_id${item.type}`}
              style={{ display: 'inline-block' }}
              onContextMenu={this.handleEvent.bind(null, item)}
            >
              <span className={'treeNodeDiv'} id={'node_' + item.id}>
                <span
                  className={`DeviceTreeIcon DeviceTree_${item.type}_${alarmLevel}${deviceState}`}
                />

                <span>
                  {item.name} {item.ip ? `(${item.ip})` : ''}
                </span>
              </span>
            </MenuProvider>
          }
          key={item.id}
          dataRef={item}
          isLeaf={LeafType[item.type] !== undefined}
        />
      );
    });

  // 新增
  add = (type: number, e: any) => {
    // 如果新增元素有子元素 需要拿到排序sq
    let seq = 1;
    // 如果大于等于两条数据 比较最大的那一条
    let bigSeq: any = null;
    if (e.props.children) {
      // 就一条数据最大的数据就是他本身
      if (e.props.children.length === 1) {
        bigSeq = e.props.children[0];
      } else {
        bigSeq = e.props.children.reduce((x: any, y: any) => {
          return x.seq > y.seq ? x : y;
        });
      }
    }
    if (bigSeq) {
      seq = bigSeq.seq + 1;
    }
    const { treeAdd } = this.props;
    treeAdd({
      renderId: e.props.id,
      nodeId: e.props.nodeId,
      type,
      seq,
      currentObj: e.props,
    });
  };

  // 删除
  del = e => {
    const { treeDel } = this.props;
    treeDel({
      nodeId: e.props.nodeId,
    });
  };

  // 拖拽方法
  onDrop = info => {
    console.log('onDrop', info);
  };

  // 列车
  MyAwesomeMenu = () => {
    return (
      <Menu id="menu_id1001">
        <Submenu
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon style={{ color: 'green', marginRight: '5px' }} type="plus" />
              <span>{formatMessage({ id: 'systemConfig.add' })}</span>
            </div>
          }
        >
          <Item onClick={this.add.bind(null, 1002)}>{formatMessage({ id: 'trailer' })}</Item>
          <Separator />
          <Item onClick={this.add.bind(null, 1003)}>{formatMessage({ id: 'car' })}</Item>
        </Submenu>
      </Menu>
    );
  };
  // 1002
  MyAwesomeMenu1002 = () => {
    return (
      <Menu id="menu_id1002">
        <Submenu
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon style={{ color: 'green', marginRight: '5px' }} type="plus" />
              <span>{formatMessage({ id: 'systemConfig.add' })}</span>
            </div>
          }
        >
          <Item onClick={this.add.bind(null, 2001)}>{formatMessage({ id: 'Pre Processors' })}</Item>
          <Separator />
          <Item onClick={this.add.bind(null, 2002)}>
            {formatMessage({ id: 'Back Processors' })}
          </Item>
        </Submenu>
        <Item onClick={this.del}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon style={{ color: 'green', marginRight: '5px' }} type="minus" />
            <span>{formatMessage({ id: 'systemConfig.del' })}</span>
          </div>
        </Item>
      </Menu>
    );
  };
  //1003
  MyAwesomeMenu1003 = () => {
    return (
      <Menu id="menu_id1003">
        <Submenu
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon style={{ color: 'green', marginRight: '5px' }} type="plus" />
              <span>{formatMessage({ id: 'systemConfig.add' })}</span>
            </div>
          }
        >
          <Item onClick={this.add.bind(null, 2001)}>{formatMessage({ id: 'Pre Processors' })}</Item>
          <Separator />
          <Item onClick={this.add.bind(null, 2002)}>
            {formatMessage({ id: 'Back Processors' })}
          </Item>
        </Submenu>
        <Item onClick={this.del}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon style={{ color: 'green', marginRight: '5px' }} type="minus" />
            <span>{formatMessage({ id: 'systemConfig.del' })}</span>
          </div>
        </Item>
      </Menu>
    );
  };
  // 钱
  // MyAwesomeMenu2001 = () => {
  //   return (
  //     <Menu id="menu_id2001">
  //       <Submenu
  //         label={
  //           <div style={{ display: 'flex', alignItems: 'center' }}>
  //             <Icon style={{ color: 'green', marginRight: '5px' }} type="plus" />
  //             <span>{formatMessage({ id: 'systemConfig.add' })}</span>
  //           </div>
  //         }
  //       >
  //         <Item onClick={this.add.bind(null, 3001)}>
  //           {formatMessage({ id: 'Vibration temperature composite sensor' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 3002)}>
  //           {formatMessage({ id: 'Speed sensor' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 3003)}>
  //           {formatMessage({ id: 'Trid channel  (temperature)' })}
  //         </Item>

  //         <Item onClick={this.add.bind(null, 3004)}>{formatMessage({ id: 'Single channel  (temperature)' })}</Item>
  //         <Item onClick={this.add.bind(null, 3005)}>
  //           {formatMessage({ id: 'Temperature sensor' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 8)}>
  //           {formatMessage({ id: 'Temperature waveforms' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 9)}>{formatMessage({ id: 'Speed waveform' })}</Item>
  //         {/* <Item onClick={this.add.bind(null, 7)}>
  //           {formatMessage({ id: 'Vibration waveform' })}
  //         </Item> */}
  //       </Submenu>
  //       <Item onClick={this.del}>
  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <Icon style={{ color: 'green', marginRight: '5px' }} type="minus" />
  //           <span>{formatMessage({ id: 'systemConfig.del' })}</span>
  //         </div>
  //       </Item>
  //     </Menu>
  //   );
  // };

  // // 普通设备
  // MyAwesomeMenu2002 = () => {
  //   return (
  //     <Menu id="menu_id2002">
  //       <Submenu
  //         label={
  //           <div style={{ display: 'flex', alignItems: 'center' }}>
  //             <Icon style={{ color: 'green', marginRight: '5px' }} type="plus" />
  //             <span>{formatMessage({ id: 'systemConfig.add' })}</span>
  //           </div>
  //         }
  //       >
  //         <Item onClick={this.add.bind(null, 3)}>
  //           {formatMessage({ id: 'Single channel  (temperature)' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 4)}>
  //           {formatMessage({ id: 'Trid channel  (temperature)' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 5)}>
  //           {formatMessage({ id: 'ZHLH.PumpMonitoring.temperature' })}
  //         </Item>

  //         <Item onClick={this.add.bind(null, 6)}>{formatMessage({ id: 'tree.speed' })}</Item>
  //         <Item onClick={this.add.bind(null, 7)}>
  //           {formatMessage({ id: 'Vibration waveforms' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 8)}>
  //           {formatMessage({ id: 'Temperature waveforms' })}
  //         </Item>
  //         <Item onClick={this.add.bind(null, 9)}>{formatMessage({ id: 'Speed waveform' })}</Item>
  //         {/* <Item onClick={this.add.bind(null, 7)}>
  //           {formatMessage({ id: 'Vibration waveform' })}
  //         </Item> */}
  //       </Submenu>
  //       <Item onClick={this.del}>
  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <Icon style={{ color: 'green', marginRight: '5px' }} type="minus" />
  //           <span>{formatMessage({ id: 'systemConfig.del' })}</span>
  //         </div>
  //       </Item>
  //     </Menu>
  //   );
  // };

  render() {
    const {
      renderTreeData,
      onSelectTreeNode,
      autoExpandParent,
      expandedKeys,
      onTreeExpand,
      selectedKeys,
    } = this.props;

    return (
      <>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            height: 'calc(100vh - 110px)',
            paddingTop: 4,
            userSelect: 'none',
          }}
        >
          <div style={{ overflow: 'auto', flex: 1 }} ref={this.divTreetRef}>
            <Tree
              onSelect={onSelectTreeNode}
              autoExpandParent={autoExpandParent}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onExpand={onTreeExpand}
              showLine
              draggable
              onDrop={this.onDrop}
              showIcon={false}
            >
              {this.loop(renderTreeData)}
            </Tree>
            {this.MyAwesomeMenu()}
            {this.MyAwesomeMenu1002()}
            {this.MyAwesomeMenu1003()}
            {/* {this.MyAwesomeMenu2001()}
            {this.MyAwesomeMenu2002()} */}
          </div>
        </div>
      </>
    );
  }
}
export default Index;
