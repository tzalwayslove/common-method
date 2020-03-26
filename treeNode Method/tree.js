import React, { PureComponent } from 'react';
import { Spin, Row, Col, Form, Input, Button, Table, Select, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { ArrayToTree_DeviceId } from '../../utils/utils';
import TreeComponent from './components/Tree';
import { formatMessage } from 'locale';
import styles from './index.less';

import 'react-contexify/dist/ReactContexify.min.css';
const { Item } = Form;
const { Option } = Select;

@connect(state => ({
  loading:
    state.loading.effects['CarManager/getAllTreeDataList'] ||
    state.loading.effects['CarManager/query'],
  CarManager: state.CarManager,
}))
class Car extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      selectedKeys: [],
      autoExpandParent: false,
      showTable: false,
      type: 0,
      // 模板数据前台要求写死
      tuoche: {
        leftDataSource: [
          {
            id: 1,
            chNo: 1,
            chAssetID: 0,
            chSensorType: 3001,
            ChSensitivityList: [7],
          },
          { id: 2, chNo: 2, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [4] },
          { id: 3, chNo: 3, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [1] },
          { id: 4, chNo: 4, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [11] },
          { id: 5, chNo: 5, chAssetID: 0, chSensorType: 3002, ChSensitivityList: [12] },
          { id: 6, chNo: 6, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 7, chNo: 7, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 8, chNo: 8, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 9, chNo: 9, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 10, chNo: 10, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 11, chNo: 11, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 12, chNo: 12, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 13, chNo: 13, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 14, chNo: 14, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 15, chNo: 15, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 16, chNo: 16, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
        ],

        rightDataSource: [
          {
            id: 1,
            chNo: 1,
            chAssetID: 0,
            chSensorType: 3001,
            ChSensitivityList: [7],
          },
          { id: 2, chNo: 2, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [7] },
          { id: 3, chNo: 3, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [1] },
          { id: 4, chNo: 4, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [11] },
          { id: 5, chNo: 5, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 6, chNo: 6, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 7, chNo: 7, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 8, chNo: 8, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 9, chNo: 9, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 10, chNo: 10, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 11, chNo: 11, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 12, chNo: 12, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 13, chNo: 13, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 14, chNo: 14, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 15, chNo: 15, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 16, chNo: 16, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
        ],
      },
      // 模板数据前台要求写死
      dongche: {
        leftDataSource: [
          {
            id: 1,
            chNo: 1,
            chAssetID: 0,
            chSensorType: 3001,
            ChSensitivityList: [7],
          },
          { id: 2, chNo: 2, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [4] },
          { id: 3, chNo: 3, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [1] },
          { id: 4, chNo: 4, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [11] },
          { id: 5, chNo: 5, chAssetID: 0, chSensorType: 3003, ChSensitivityList: [12, 2, 3] },
          { id: 6, chNo: 6, chAssetID: 0, chSensorType: 3003, ChSensitivityList: [1, 2, 3] },
          { id: 7, chNo: 7, chAssetID: 0, chSensorType: 3004, ChSensitivityList: [2] },
          { id: 8, chNo: 8, chAssetID: 0, chSensorType: 3004, ChSensitivityList: [4] },
          { id: 9, chNo: 9, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [2] },
          { id: 10, chNo: 10, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [4] },
          { id: 11, chNo: 11, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [11] },
          { id: 12, chNo: 12, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [12] },
          { id: 13, chNo: 13, chAssetID: 0, chSensorType: 3005, ChSensitivityList: [1] },
          { id: 14, chNo: 14, chAssetID: 0, chSensorType: 3005, ChSensitivityList: [2] },
          { id: 15, chNo: 15, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
          { id: 16, chNo: 16, chAssetID: 0, chSensorType: 9999, ChSensitivityList: [] },
        ],

        rightDataSource: [
          {
            id: 1,
            chNo: 1,
            chAssetID: 2,
            chSensorType: 3001,
            ChSensitivityList: [7],
          },
          { id: 2, chNo: 2, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [4] },
          { id: 3, chNo: 3, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [1] },
          { id: 4, chNo: 4, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [11, 72, 3] },
          { id: 5, chNo: 5, chAssetID: 0, chSensorType: 3003, ChSensitivityList: [12, 2, 3] },
          { id: 6, chNo: 6, chAssetID: 0, chSensorType: 3003, ChSensitivityList: [1, 2, 3] },
          { id: 7, chNo: 7, chAssetID: 0, chSensorType: 3004, ChSensitivityList: [2] },
          { id: 8, chNo: 8, chAssetID: 0, chSensorType: 3004, ChSensitivityList: [4] },
          { id: 9, chNo: 9, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [2] },
          { id: 10, chNo: 10, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [4] },
          { id: 11, chNo: 11, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [11] },
          { id: 12, chNo: 12, chAssetID: 0, chSensorType: 3001, ChSensitivityList: [12] },
          { id: 13, chNo: 13, chAssetID: 0, chSensorType: 3005, ChSensitivityList: [1] },
          { id: 14, chNo: 14, chAssetID: 0, chSensorType: 3005, ChSensitivityList: [2] },
          { id: 15, chNo: 15, chAssetID: 0, chSensorType: 3005, ChSensitivityList: [4] },
          { id: 16, chNo: 16, chAssetID: 0, chSensorType: 3005, ChSensitivityList: [2] },
        ],
      },
      // 要求动态根据树获取关联测点的数据
      leftliandongList: [],
      rightliandongList: [],
    };
  }

  async componentWillMount() {
    const { dispatch } = this.props;

    await dispatch({ type: 'CarManager/getAllTreeDataList', payload: {} });
  }
  //选中企业设备中的节点(获取联动数据)
  onSelectTreeNode = (nodeid, e) => {
    const { dispatch, CarManager } = this.props;
    const { treeData } = CarManager;
    const { tuoche, dongche } = this.state;
    // 重置输入
    this.props.form.resetFields();
    let bool =
      e.node.props.dataRef.type === 1002 || e.node.props.dataRef.type === 1003 ? true : false;
    this.setState({
      selectedKeys: [e.node.props.dataRef.id],
      showTable: bool,
      type: e.node.props.dataRef.type,
    });
    //  查询接口
    dispatch({
      type: 'CarManager/query',
      payload: {
        nodeId: e.node.props.dataRef.nodeId,
      },
    });
    // 点到动车和拖车时 需要渲染表格
    if (e.node.props.dataRef.type === 1002 || e.node.props.dataRef.type === 1003) {
      let assetId = e.node.props.dataRef.nodeId;

      // 联动
      let liandongParerntList = treeData.filter(v => {
        return v.pNodeId === assetId;
      });
      let liandongList = [];
      liandongParerntList.map(v => {
        liandongList.push(...v.children);
      });

      let leftliandongList = liandongList.filter(v => {
        return v.pNodeId === liandongParerntList[0].nodeId;
      });
      let rightliandongList = liandongList.filter(v => {
        return v.pNodeId === liandongParerntList[1].nodeId;
      });

      // 重置前后table数据

      let renderRightData = [];
      let renderLeftData = [];
      // 首先判断 是拖车还是动车
      if (e.node.props.dataRef.type === 1002) {
        // 取出拖车数据
        renderLeftData = [...tuoche.leftDataSource];
        renderRightData = [...tuoche.rightDataSource];
      } else if (e.node.props.dataRef.type === 1003) {
        renderLeftData = [...dongche.leftDataSource];
        renderRightData = [...dongche.rightDataSource];
      }
      // 把筛选出来的数组按照type对象排序(对renderLeftData里的chAssetID进行赋值)
      let leftliandongObj = { 3001: [], 3002: [], 3003: [], 3004: [], 3005: [], 9999: [] };
      [...leftliandongList, { name: '无', type: 9999 }].map(v => {
        if (v.type === 3001) {
          leftliandongObj[3001].push(v);
        } else if (v.type === 3002) {
          leftliandongObj[3002].push(v);
        } else if (v.type === 3003) {
          leftliandongObj[3003].push(v);
        } else if (v.type === 3004) {
          leftliandongObj[3004].push(v);
        } else if (v.type === 3005) {
          leftliandongObj[3005].push(v);
        } else if (v.type === 9999) {
          leftliandongObj[9999].push(v);
        }
      });
      let rightliandongObj = { 3001: [], 3002: [], 3003: [], 3004: [], 3005: [], 9999: [] };
      [...rightliandongList, { name: '无', type: 9999 }].map(v => {
        if (v.type === 3001) {
          rightliandongObj[3001].push(v);
        } else if (v.type === 3002) {
          rightliandongObj[3002].push(v);
        } else if (v.type === 3003) {
          rightliandongObj[3003].push(v);
        } else if (v.type === 3004) {
          rightliandongObj[3004].push(v);
        } else if (v.type === 3005) {
          rightliandongObj[3005].push(v);
        } else if (v.type === 9999) {
          rightliandongObj[9999].push(v);
        }
      });

      let r3001 = 0;
      let r3002 = 0;
      let r3003 = 0;
      let r3004 = 0;
      let r3005 = 0;
      renderLeftData.map(v => {
        if (v.chSensorType === 3001) {
          v.chAssetID = leftliandongObj[3001][r3001] ? leftliandongObj[3001][r3001].nodeId : null;
          r3001++;
        } else if (v.chSensorType === 3002) {
          v.chAssetID = leftliandongObj[3002][r3002] ? leftliandongObj[3002][r3002].nodeId : null;
          r3002++;
        } else if (v.chSensorType === 3003) {
          v.chAssetID = leftliandongObj[3003][r3003] ? leftliandongObj[3003][r3003].nodeId : null;
          r3003++;
        } else if (v.chSensorType === 3004) {
          v.chAssetID = leftliandongObj[3004][r3004] ? leftliandongObj[3004][r3004].nodeId : null;
          r3004++;
        } else if (v.chSensorType === 3005) {
          v.chAssetID = leftliandongObj[3005][r3005] ? leftliandongObj[3005][r3005].nodeId : null;
          r3005++;
        }
      });

      let l3001 = 0;
      let l3002 = 0;
      let l3003 = 0;
      let l3004 = 0;
      let l3005 = 0;

      renderRightData.map(v => {
        if (v.chSensorType === 3001) {
          v.chAssetID = rightliandongObj[3001][l3001] ? rightliandongObj[3001][l3001].nodeId : null;
          l3001++;
        } else if (v.chSensorType === 3002) {
          v.chAssetID = rightliandongObj[3002][l3002] ? rightliandongObj[3002][l3002].nodeId : null;
          l3002++;
        } else if (v.chSensorType === 3003) {
          v.chAssetID = rightliandongObj[3003][l3003] ? rightliandongObj[3003][l3003].nodeId : null;
          l3003++;
        } else if (v.chSensorType === 3004) {
          v.chAssetID = rightliandongObj[3004][l3004] ? rightliandongObj[3004][l3004].nodeId : null;
          l3004++;
        } else if (v.chSensorType === 3005) {
          v.chAssetID = rightliandongObj[3005][l3005] ? rightliandongObj[3005][l3005].nodeId : null;
          l3005++;
        }
      });
      //   重新修正拖车数据
      if (e.node.props.dataRef.type === 1002) {
        this.setState({
          tuoche: {
            leftDataSource: [...renderLeftData],
            rightDataSource: [...renderRightData],
          },
        });
      } else if (e.node.props.dataRef.type === 1003) {
        this.setState({
          dongche: {
            leftDataSource: [...renderLeftData],
            rightDataSource: [...renderRightData],
          },
        });
      }
      console.log(leftliandongList);
      this.setState({
        leftliandongList: [...leftliandongList, { name: '无', type: 9999 }],
        rightliandongList: [...rightliandongList, { name: '无', type: 9999 }],
      });
    }
  };

  // 右键控制高亮
  onRightTreeNode = id => {
    this.setState({ selectedKeys: [id] });
  };

  // 树节点展开与否
  onTreeExpand = expandedKeys => {
    this.setState({
      expandedKeys: expandedKeys,
      autoExpandParent: false,
    });
  };
  submit = () => {
    const { validateFieldsAndScroll } = this.props.form;
    const { showTable, type, dongche, tuoche } = this.state;
    const { dispatch, CarManager } = this.props;
    const { currentObj } = CarManager;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      // 分情况讨论提交    根据currentObj里面的instrList判断是新的车还是旧车

      dispatch({
        type: 'CarManager/SaveAsset',
        payload: {
          saveType: currentObj.instrList.length !== 0 ? 1 : 0,
          assetInstr: {
            assetId: currentObj.assetId,
            assetName: values.assetName,
            assetCode: values.assetCode,
            serverIp: values.serverIp,
            port: values.port,
            instrList:
              currentObj.instrList.length !== 0
                ? [
                    {
                      instrCode: values.instrLeftCode,
                      instrServerIp: values.serverIp,
                      instrServerPort: values.port,
                      instrPosition: 1,
                      channelist: currentObj.instrList[0],
                    },
                    {
                      instrCode: values.instrRightCode,
                      instrServerIp: values.serverIp,
                      instrServerPort: values.port,
                      instrPosition: 2,
                      channelist: currentObj.instrList[1],
                    },
                  ]
                : showTable
                ? [
                    {
                      instrCode: values.instrLeftCode,
                      instrServerIp: values.serverIp,
                      instrServerPort: values.port,
                      instrPosition: 1,
                      channelist: type === 1002 ? tuoche.leftDataSource : dongche.leftDataSource,
                    },
                    {
                      instrCode: values.instrRightCode,
                      instrServerIp: values.serverIp,
                      instrServerPort: values.port,
                      instrPosition: 2,
                      channelist: type === 1002 ? tuoche.rightDataSource : dongche.rightDataSource,
                    },
                  ]
                : [],
          },
        },
      });
    });
  };

  // 新增方法
  // 树节点增加打开模态框
  treeAdd = node => {
    const { dispatch } = this.props;
    dispatch({
      type: 'CarManager/addAsset',
      payload: {
        assetParentId: node.nodeId,
        assetType: node.type,
        assetPathIds: node.currentObj.pathIds,
      },
    });
  };
  // 删除操作
  treeDel = payload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'CarManager/delAsset',
      payload: payload.nodeId,
    });
  };
  // 前转向配置传感器类型
  onLeftchSensorTypeChange = (value, e, record) => {
    const { type, tuoche, dongche } = this.state;
    const { CarManager, dispatch } = this.props;
    const { currentObj } = CarManager;
    // 首先要确定 修改的数据是模板数据还是后台传来的数据
    if (currentObj.instrList.length === 0) {
      // 如果长度为0 说明是模板数据
      // 在进行判断是拖车还是动车
      if (type === 1002) {
        // 拖车数据
        let data = [...tuoche.leftDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chSensorType = value;
            item.chAssetID = 0;
            if (value === 3003) {
              item.ChSensitivityList = [10, 0, 10];
            } else {
              item.ChSensitivityList = [100];
            }
          }
        });
        data = data.concat([]);
        this.setState({
          tuoche: {
            ...tuoche,
            ...data,
          },
        });
      } else if (type === 1003) {
        // 动车数据
        let data = [...dongche.leftDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chSensorType = value;
            item.chAssetID = 0;

            if (value === 3003) {
              item.ChSensitivityList = [10, 0, 10];
            } else {
              item.ChSensitivityList = [100];
            }
          }
        });
        data = data.concat([]);

        this.setState({
          dongche: {
            ...dongche,
            ...data,
          },
        });
      }
    } else {
      // 数组有值 说明是后台数据
      // 后台有数据 不用判断动车还是拖车 直接改数据
      let data = currentObj.instrList[0].channelist;
      data.map(item => {
        if (item.chNo === record.chNo) {
          item.chSensorType = value;
          item.chAssetID = 0;

          if (value === 3003) {
            item.ChSensitivityList = [10, 0, 10];
          } else {
            item.ChSensitivityList = [100];
          }
        }
      });
      data = data.concat([]);
      dispatch({
        type: 'CarManager/updateState',
        payload: {
          currentObj: {
            ...currentObj,
            data,
          },
        },
      });
    }
  };
  // 后转向配置传感器类型
  onRightchSensorTypeChange = (value, e, record) => {
    const { type, tuoche, dongche } = this.state;
    const { CarManager, dispatch } = this.props;
    const { currentObj } = CarManager;
    console.log(type, currentObj);
    // 首先要确定 修改的数据是模板数据还是后台传来的数据
    if (currentObj.instrList.length === 0) {
      // 如果长度为0 说明是模板数据
      // 在进行判断是拖车还是动车
      if (type === 1002) {
        // 拖车数据
        let data = [...tuoche.rightDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chSensorType = value;
            item.chAssetID = 0;

            if (value === 3003) {
              item.ChSensitivityList = [10, 0, 10];
            } else {
              item.ChSensitivityList = [100];
            }
          }
        });
        data = data.concat([]);
        this.setState({
          tuoche: {
            ...tuoche,
            ...data,
          },
        });
      } else if (type === 1003) {
        // 动车数据
        let data = [...dongche.rightDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chSensorType = value;
            item.chAssetID = 0;

            if (value === 3003) {
              item.ChSensitivityList = [10, 0, 10];
            } else {
              item.ChSensitivityList = [100];
            }
          }
        });
        data = data.concat([]);

        this.setState({
          dongche: {
            ...dongche,
            ...data,
          },
        });
      }
    } else {
      // 数组有值 说明是后台数据
      // 后台有数据 不用判断动车还是拖车 直接改数据
      let data = currentObj.instrList[1].channelist;
      data.map(item => {
        if (item.chNo === record.chNo) {
          item.chSensorType = value;
          item.chAssetID = 0;

          if (value === 3003) {
            item.ChSensitivityList = [10, 0, 10];
          } else {
            item.ChSensitivityList = [100];
          }
        }
      });
      data = data.concat([]);
      dispatch({
        type: 'CarManager/updateState',
        payload: {
          currentObj: {
            ...currentObj,
            data,
          },
        },
      });
    }
  };

  onchAssetIDLeftChangeSelect = (value, e, record) => {
    const { type, tuoche, dongche } = this.state;
    const { CarManager, dispatch } = this.props;
    const { currentObj } = CarManager;
    // 首先要确定 修改的数据是模板数据还是后台传来的数据
    if (currentObj.instrList.length === 0) {
      // 如果长度为0 说明是模板数据
      // 在进行判断是拖车还是动车
      if (type === 1002) {
        // 拖车数据
        let data = [...tuoche.leftDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chAssetID = value;
          }
        });
        data = data.concat([]);
        this.setState({
          tuoche: {
            ...tuoche,
            ...data,
          },
        });
      } else if (type === 1003) {
        // 动车数据
        let data = [...dongche.leftDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chAssetID = value;
          }
        });
        data = data.concat([]);

        this.setState({
          dongche: {
            ...dongche,
            ...data,
          },
        });
      }
    } else {
      // 数组有值 说明是后台数据
      // 后台有数据 不用判断动车还是拖车 直接改数据
      let data = currentObj.instrList[0].channelist;
      data.map(item => {
        if (item.chNo === record.chNo) {
          item.chAssetID = value;
        }
      });
      data = data.concat([]);
      dispatch({
        type: 'CarManager/updateState',
        payload: {
          currentObj: {
            ...currentObj,
            data,
          },
        },
      });
    }
  };

  onchAssetIDRightChangeSelect = (value, e, record) => {
    const { type, tuoche, dongche } = this.state;
    const { CarManager, dispatch } = this.props;
    const { currentObj } = CarManager;
    // 首先要确定 修改的数据是模板数据还是后台传来的数据
    if (currentObj.instrList.length === 0) {
      // 如果长度为0 说明是模板数据
      // 在进行判断是拖车还是动车
      if (type === 1002) {
        // 拖车数据
        let data = [...tuoche.rightDataSource];
        console.log(data, 221);
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chAssetID = value;
          }
        });
        data = data.concat([]);
        this.setState({
          tuoche: {
            ...tuoche,
            ...data,
          },
        });
      } else if (type === 1003) {
        // 动车数据
        let data = [...dongche.rightDataSource];
        data.map(item => {
          if (item.chNo === record.chNo) {
            item.chAssetID = value;
          }
        });
        data = data.concat([]);

        this.setState({
          dongche: {
            ...dongche,
            ...data,
          },
        });
      }
    } else {
      // 数组有值 说明是后台数据
      // 后台有数据 不用判断动车还是拖车 直接改数据
      let data = currentObj.instrList[1].channelist;
      data.map(item => {
        if (item.chNo === record.chNo) {
          item.chAssetID = value;
        }
      });
      data = data.concat([]);
      dispatch({
        type: 'CarManager/updateState',
        payload: {
          currentObj: {
            ...currentObj,
            data,
          },
        },
      });
    }
  };
  // 灵敏度系数
  onLeftChangeSpeed = (e, record, biaoshi, arrposition) => {
    const { type, tuoche, dongche } = this.state;
    const { CarManager, dispatch } = this.props;
    const { currentObj } = CarManager;
    // 首先要确定 修改的数据是模板数据还是后台传来的数据
    if (currentObj.instrList.length === 0) {
      // 如果长度为0 说明是模板数据
      // 在进行判断是拖车还是动车
      if (type === 1002) {
        // 拖车数据
        let data = [...tuoche.leftDataSource];

        data.map(item => {
          if (item.chNo === record.chNo) {
            item[biaoshi][arrposition] = e;
          }
        });
        data = data.concat([]);
        this.setState({
          tuoche: {
            ...tuoche,
            ...data,
          },
        });
      } else if (type === 1003) {
        // 动车数据
        let data = [...dongche.leftDataSource];
        console.log(data, 221);
        data.map(item => {
          if (item.chNo === record.chNo) {
            item[biaoshi][arrposition] = e;
          }
        });
        console.log(data, 221);
        data = data.concat([]);

        this.setState({
          dongche: {
            ...dongche,
            ...data,
          },
        });
      }
    } else {
      // 数组有值 说明是后台数据
      // 后台有数据 不用判断动车还是拖车 直接改数据
      let data = currentObj.instrList[0].channelist;
      data.map(item => {
        if (item.chNo === record.chNo) {
          item[biaoshi][arrposition] = e;
        }
      });
      data = data.concat([]);
      dispatch({
        type: 'CarManager/updateState',
        payload: {
          currentObj: {
            ...currentObj,
            data,
          },
        },
      });
    }
  };
  onRightChangeSpeed = (e, record, biaoshi, arrposition) => {
    const { type, tuoche, dongche } = this.state;
    const { CarManager, dispatch } = this.props;
    const { currentObj } = CarManager;
    // 首先要确定 修改的数据是模板数据还是后台传来的数据
    if (currentObj.instrList.length === 0) {
      // 如果长度为0 说明是模板数据
      // 在进行判断是拖车还是动车
      if (type === 1002) {
        // 拖车数据
        let data = [...tuoche.rightDataSource];

        data.map(item => {
          if (item.chNo === record.chNo) {
            item[biaoshi][arrposition] = e;
          }
        });
        data = data.concat([]);
        this.setState({
          tuoche: {
            ...tuoche,
            ...data,
          },
        });
      } else if (type === 1003) {
        // 动车数据
        let data = [...dongche.rightDataSource];
        console.log(data, 221);
        data.map(item => {
          if (item.chNo === record.chNo) {
            item[biaoshi][arrposition] = e;
          }
        });
        console.log(data, 221);
        data = data.concat([]);

        this.setState({
          dongche: {
            ...dongche,
            ...data,
          },
        });
      }
    } else {
      // 数组有值 说明是后台数据
      // 后台有数据 不用判断动车还是拖车 直接改数据
      let data = currentObj.instrList[1].channelist;
      data.map(item => {
        if (item.chNo === record.chNo) {
          item[biaoshi][arrposition] = e;
        }
      });
      data = data.concat([]);
      dispatch({
        type: 'CarManager/updateState',
        payload: {
          currentObj: {
            ...currentObj,
            data,
          },
        },
      });
    }
  };
  render() {
    const {
      selectedKeys,
      expandedKeys,
      autoExpandParent,
      showTable,
      type,
      tuoche,
      dongche,
      leftliandongList,
      rightliandongList,
    } = this.state;

    const { loading, CarManager } = this.props;
    const { treeData, currentObj } = CarManager;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    // // 树的数据进行处理
    const { getFieldDecorator } = this.props.form;

    const renderTreeData = ArrayToTree_DeviceId(treeData, 'nodeId', 'pNodeId');
    let renderexpandedKeys = [];
    if (expandedKeys.length === 0 && renderTreeData.length !== 0) {
      renderexpandedKeys.push(renderTreeData[0].id);
    } else {
      renderexpandedKeys = [...expandedKeys];
    }

    const typeList = [
      { key: 3001, name: formatMessage({ id: 'Vibration temperature composite sensor' }) },
      { key: 3002, name: formatMessage({ id: 'Speed sensor' }) },
      { key: 3003, name: formatMessage({ id: 'Trid channel  (temperature)' }) },
      { key: 3004, name: formatMessage({ id: 'Single channel  (temperature)' }) },
      { key: 3005, name: formatMessage({ id: 'Temperature sensor' }) },
      { key: 9999, name: '无' },
    ];
    // 渲染到表格的数据
    let tableLeft = [];
    let tableRight = [];
    // 如果获取到的采集站table不为空说明有数据 就不需要使用模板
    if (currentObj.instrList && currentObj.instrList.length !== 0) {
      tableLeft = currentObj.instrList[0] ? [...currentObj.instrList[0].channelist] : [];
      tableRight = currentObj.instrList[0] ? [...currentObj.instrList[1].channelist] : [];
    } else {
      // 拖车的情况
      if (type === 1002) {
        tableLeft = [...tuoche.leftDataSource];
        tableRight = [...tuoche.rightDataSource];
      } else if (type === 1003) {
        // 动车的情况
        tableLeft = [...dongche.leftDataSource];
        tableRight = [...dongche.rightDataSource];
      }
    }
    const leftColumns = [
      {
        title: 'No',
        dataIndex: 'chNo',
        key: 'chNo',
        width: '40px',
        align: 'center',
      },

      {
        title: formatMessage({ id: 'healStatus.stationNet' }),
        dataIndex: 'chSensorType',
        key: 'chSensorType',
        width: '160px',

        render: (chSensorType, record) => {
          return (
            <Select
              showSearch
              placeholder={formatMessage({ id: 'pleaseSelect' })}
              onChange={(value, e) => {
                this.onLeftchSensorTypeChange(value, e, record);
              }}
              style={{ width: 150 }}
              value={chSensorType}
              size={'small'}
            >
              {typeList.map(item => (
                <Option value={item.key} key={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          );
        },
        align: 'center',
      },
      {
        title: formatMessage({ id: 'EquipmentParts.glcd' }),
        dataIndex: 'chAssetID',
        key: 'chAssetID',
        width: '130px',
        render: (chAssetID, record) => {
          return (
            <Select
              showSearch
              placeholder={formatMessage({ id: 'pleaseSelect' })}
              onChange={(value, e) => {
                this.onchAssetIDLeftChangeSelect(value, e, record);
              }}
              style={{ width: 130 }}
              value={chAssetID === 0 ? '' : chAssetID}
              size={'small'}
            >
              {leftliandongList.map(v => {
                if (record.chSensorType === v.type) {
                  return (
                    <Option value={v.nodeId} key={v.nodeId}>
                      {v.name}
                    </Option>
                  );
                }
              })}
            </Select>
          );
        },
        align: 'center',
      },
      {
        title: formatMessage({ id: 'sensitivity coefficient' }),
        dataIndex: 'ChSensitivityList',
        key: 'ChSensitivityList',

        render: (ChSensitivityList, record) => {
          if (record.chSensorType === 3003) {
            return (
              <>
                <InputNumber
                  // min={0}
                  // max={10}
                  // // formatter={value => {
                  // //   return String(Math.floor(value));
                  // // }}
                  placeholder="x"
                  value={ChSensitivityList[0]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'ChSensitivityList', '0');
                  }}
                />
                <InputNumber
                  placeholder="y"
                  value={ChSensitivityList[1]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'ChSensitivityList', '1');
                  }}
                />
                <InputNumber
                  placeholder="z"
                  value={ChSensitivityList[2]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'ChSensitivityList', '2');
                  }}
                />
              </>
            );
          } else {
            return (
              <>
                <InputNumber
                  value={ChSensitivityList[0]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'ChSensitivityList', '0');
                  }}
                />
              </>
            );
          }
        },
        align: 'center',
      },
    ];
    const rightColumns = [
      {
        title: 'No',
        dataIndex: 'chNo',
        key: 'chNo',
        width: '60px',
        align: 'center',
      },

      {
        title: formatMessage({ id: 'healStatus.stationNet' }),
        dataIndex: 'chSensorType',
        key: 'chSensorType',
        width: '160px',

        render: (chSensorType, record) => (
          <Select
            showSearch
            placeholder={formatMessage({ id: 'pleaseSelect' })}
            onChange={(value, e) => {
              this.onRightchSensorTypeChange(value, e, record);
            }}
            style={{ width: 150 }}
            value={chSensorType}
            size={'small'}
          >
            {typeList.map(item => (
              <Option value={item.key} key={item.key}>
                {item.name}
              </Option>
            ))}
          </Select>
        ),
        align: 'center',
      },
      {
        title: formatMessage({ id: 'EquipmentParts.glcd' }),
        dataIndex: 'chAssetID',
        key: 'chAssetID',
        width: '130px',
        render: (chAssetID, record) => (
          <Select
            showSearch
            placeholder={formatMessage({ id: 'pleaseSelect' })}
            onChange={(value, e) => {
              this.onchAssetIDRightChangeSelect(value, e, record);
            }}
            style={{ width: 130 }}
            value={chAssetID === 0 ? '' : chAssetID}
            size={'small'}
          >
            {rightliandongList.map(v => {
              if (record.chSensorType === v.type) {
                return (
                  <Option value={v.nodeId} key={v.nodeId}>
                    {v.name}
                  </Option>
                );
              }
            })}
          </Select>
        ),
        align: 'center',
      },
      {
        title: formatMessage({ id: 'sensitivity coefficient' }),
        dataIndex: 'ChSensitivityList',
        key: 'ChSensitivityList',

        render: (ChSensitivityList, record) => {
          if (record.chSensorType === 3003) {
            return (
              <>
                <InputNumber
                  placeholder="z"
                  value={ChSensitivityList[0]}
                  size={'small'}
                  onChange={e => {
                    this.onRightChangeSpeed(e, record, 'ChSensitivityList', '0');
                  }}
                />
                <InputNumber
                  placeholder="y"
                  value={ChSensitivityList[1]}
                  size={'small'}
                  onChange={e => {
                    this.onRightChangeSpeed(e, record, 'ChSensitivityList', '1');
                  }}
                />
                <InputNumber
                  placeholder="z"
                  value={ChSensitivityList[2]}
                  size={'small'}
                  onChange={e => {
                    this.onRightChangeSpeed(e, record, 'ChSensitivityList', '2');
                  }}
                />
              </>
            );
          } else {
            return (
              <>
                <InputNumber
                  value={ChSensitivityList[0]}
                  size={'small'}
                  onChange={e => {
                    this.onRightChangeSpeed(e, record, 'ChSensitivityList', '0');
                  }}
                />
              </>
            );
          }
        },
        align: 'center',
      },
    ];

    return (
      <Spin spinning={!!loading}>
        <Row gutter={24}>
          <Col span={4}>
            <div style={{ height: 'calc(100vh - 46px)' }}>
              <TreeComponent
                renderTreeData={renderTreeData}
                onSelectTreeNode={this.onSelectTreeNode}
                onTreeExpand={this.onTreeExpand}
                selectedKeys={selectedKeys}
                expandedKeys={renderexpandedKeys}
                autoExpandParent={autoExpandParent}
                onRightTreeNode={this.onRightTreeNode} //右键控制高亮
                treeAdd={this.treeAdd}
                treeDel={this.treeDel}
              />
            </div>
          </Col>
          <Col
            span={20}
            style={{
              borderLeft: '4px solid #c2c2c2',
              backgroundColor: '#fff',
              height: 'calc(100vh - 46px)',
            }}
          >
            <Form {...formItemLayout} className={styles.formInp}>
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      float: 'right',
                      marginRight: '16px',
                      marginBottom: '12px',
                      marginTop: '12px',
                    }}
                  >
                    <Button type="primary" onClick={this.submit}>
                      {formatMessage({ id: 'app.UserManager.Save' })}
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row gutter={24} style={{ margin: 0 }}>
                <Col span={8} className={styles.lyCol}>
                  <Item label={formatMessage({ id: 'DataCollector.add.name' })}>
                    {getFieldDecorator('assetName', {
                      initialValue: currentObj.assetName ? currentObj.assetName : '',
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'form.yes' }),
                          // pattern: /^(0|([1-9]\d*))$/,
                        },
                      ],
                    })(<Input />)}
                  </Item>
                </Col>
                <Col span={8} className={styles.lyCol}>
                  <Item label={formatMessage({ id: 'log.dev.Code' })}>
                    {getFieldDecorator('assetCode', {
                      initialValue: currentObj.assetCode ? currentObj.assetCode : '',
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'form.yes' }),
                          // pattern: /^(0|([1-9]\d*))$/,
                        },
                      ],
                    })(<Input />)}
                  </Item>
                </Col>
                {showTable ? (
                  <>
                    <Col span={8} className={styles.lyCol}>
                      <Item label={formatMessage({ id: 'train IPC' })}>
                        {getFieldDecorator('serverIp', {
                          initialValue: currentObj.serverIp ? currentObj.serverIp : '',
                          rules: [
                            {
                              required: true,
                              message: formatMessage({ id: 'form.yes' }),
                              // pattern: /^(0|([1-9]\d*))$/,
                            },
                          ],
                        })(<Input />)}
                      </Item>
                    </Col>
                    <Col span={8} className={styles.lyCol}>
                      <Item label={formatMessage({ id: 'jiaotong.port' })}>
                        {getFieldDecorator('port', {
                          initialValue: currentObj.port ? currentObj.port : '',

                          rules: [
                            {
                              required: true,
                              message: formatMessage({ id: 'form.yes' }),
                              // pattern: /^(0|([1-9]\d*))$/,
                            },
                          ],
                        })(<InputNumber  />)}
                      </Item>
                    </Col>
                    <Col
                      span={24}
                      style={{ marginBottom: '15px', height: '1px', backgroundColor: '#ccc' }}
                    />
                    <Col span={12}>
                      <Row>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                          <span style={{ color: '#000', fontSize: '18px' }}>
                            {formatMessage({ id: 'Forward steering' })}
                          </span>
                        </div>

                        <Col span={16} className={styles.lyCol}>
                          <Item label={formatMessage({ id: 'healStatus.stationCode' })}>
                            {getFieldDecorator('instrLeftCode', {
                              initialValue: currentObj.instrList
                                ? currentObj.instrList[0]
                                  ? currentObj.instrList[0].instrCode
                                  : ''
                                : '',
                              rules: [
                                {
                                  required: true,
                                  message: formatMessage({ id: 'form.yes' }),
                                  // pattern: /^(0|([1-9]\d*))$/,
                                },
                              ],
                            })(<Input />)}
                          </Item>
                        </Col>
                      </Row>
                      <div className={styles.formInp}>
                        <Table
                          bordered={false}
                          size="small"
                          columns={leftColumns}
                          dataSource={tableLeft}
                          pagination={false}
                          rowKey="chNo"
                          scroll={{ y: `calc(80vh - 190px)` }}
                        />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <span style={{ color: '#000', fontSize: '18px' }}>
                          {formatMessage({ id: 'Back steering' })}
                        </span>
                      </div>
                      <Row>
                        <Col span={16} className={styles.lyCol}>
                          <Item label={formatMessage({ id: 'healStatus.stationCode' })}>
                            {getFieldDecorator('instrRightCode', {
                              initialValue: currentObj.instrList
                                ? currentObj.instrList[1]
                                  ? currentObj.instrList[1].instrCode
                                  : ''
                                : '',
                              rules: [
                                {
                                  required: true,
                                  message: formatMessage({ id: 'form.yes' }),
                                  // pattern: /^(0|([1-9]\d*))$/,
                                },
                              ],
                            })(<Input />)}
                          </Item>
                        </Col>
                      </Row>

                      <div className={styles.formInp}>
                        <Table
                          bordered={false}
                          size="small"
                          columns={rightColumns}
                          dataSource={tableRight}
                          pagination={false}
                          rowKey="chNo"
                          scroll={{ y: `calc(80vh - 190px)` }}
                        />
                      </div>
                    </Col>
                  </>
                ) : null}
              </Row>
            </Form>
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default Form.create()(Car);
