/************************************************************************
 * 功能：角色管理
 * 作者  lee
 * 时间：2020年03月26日
 ****************************************************************************/
import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Divider, Popconfirm, Layout, message } from 'antd';
import DataTable from '../../../components/DataTableV2';
import styles from './index.less';
import { formatMessage } from 'locale';
import ZDYForm from './components/Form';

import Toolbar from '../../../components/Toolbar';
import DraggerModal from '../../../components/Modal/DragModal';
// import Ellipsis from '../../../components/Ellipsis';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

message.config({
  top: 150,
  duration: 3,
  maxCount: 4,
});

//建立连接
@connect(state => ({
  loading: state.loading.effects['StationList/GetInstrumentList'] || false,
  StationList: state.StationList,
}))
//角色管理
export default class GuiDaoJiaoTong_StationList extends React.Component {
  state = {
    modelTitle: '',
    inpVal: '',
    modalVisible: false,
    pageSize: 30,
    textConfirm: formatMessage({ id: 'app.UserManager.ConfirmDlt' }),
    proUserObj: null,
    pageNums: 1,
  };
  valnum = null;
  setModalVisible = modalVisibles => {
    this.setState({ modalVisible: modalVisibles });
  };
  //查询
  onBtnSearchClickRef = () => {
    this.setState({ pageNums: 1 });
    let obj = {
      inputVal: this.state.inpVal,
      pageNum: 1, //this.s tate.pageNums,
      pageSize: this.state.pageSize,
    };
    if (this.valnum !== null) {
      obj = this.valnum;
    }
    this.props.dispatch({ type: 'StationList/roleList', payload: obj });
  };
  //查询
  onBtnSearchClick = () => {
    this.setState({ pageNums: 1 });
    let obj = {
      inputVal: this.state.inpVal,
      pageNum: 1, //this.s tate.pageNums,
      pageSize: this.state.pageSize,
    };
    this.valnum = null;
    this.props.dispatch({ type: 'StationList/GetInstrumentList', payload: obj });
  };
  //新增
  onBtnAddUser = () => {
    var RoleNull = {};
    this.setState({ proUserObj: RoleNull });
    this.setState({ modalVisible: true });
    this.setState({ modelTitle: formatMessage({ id: 'app.UserManager.Add' }) });
  };

  onInpChanger = e => {
    this.setState({ inpVal: e.target.value });
  };
  //修改
  updateUser = user => {
    const { dispatch } = this.props;

    dispatch({
      type: 'StationList/GetInstrumentDetail',
      payload: user.instrCode,
    });
    this.setState({ modalVisible: true });
    this.setState({ modelTitle: formatMessage({ id: 'app.UserManager.Modify' }) });
  };
  //删除
  deleteRole = obj => {
    if (obj === '00000000-0000-0000-0000-000000000001') {
      this.msgTextShow(3, formatMessage({ id: 'app.UserManager.RoleNotDel' }));
      return;
    }
    let objs = {
      id: obj,
    };
    this.props.dispatch({ type: 'StationList/dltRole', payload: objs }).then(() => {
      this.onBtnSearchClickRef();
    });
  };
  AlertModel = () => {};

  componentDidMount() {
    this.onBtnSearchClick();
  }

  msgTextShow = (num, msg) => {
    switch (num) {
      case 1:
        message.success(msg);
        break;
      case 2:
        message.error(msg);
        break;
      case 3:
        message.warning(msg);
        break;
      default:
        break;
    }
  };
  submitButton = obj => {
    // if (this.state.proUserObj.id == null) {
    //   this.child_RoleFrom.SubmitVal();
    // } else {
    //   this.child_RoleFrom.SubmitUpdate();
    // }
    this.child_RoleFrom.SubmitUpdate();
  };

  onRef = ref => {
    this.child_RoleFrom = ref;
  };
  n;
  onCancel = obj => {};
  render() {
    const { StationList, dispatch, loading } = this.props;
    const { stationArr, GetInstrumentDetail } = StationList;
    let objs = this;
    let StationListNew = StationList;

    StationListNew.list = stationArr;
    console.log(StationList, stationArr);
    const columns = [
      {
        title: formatMessage({ id: 'healStatus.stationCode' }),
        name: 'instrCode',
        tableItem: {
          width: 100,
          render: value => <span>{value}</span>,
        },
      },
      {
        title: formatMessage({ id: 'train IPC' }),
        name: 'instrServerIp',
        tableItem: {
          width: 100,
          render: value => <span>{value}</span>,
        },
      },
      {
        title: formatMessage({ id: 'soft.versionNumber' }),
        name: 'a',
        tableItem: {
          width: 100,
          render: value => <span>{value}</span>,
        },
      },
      {
        title: formatMessage({ id: 'hardware.versionNumber' }),
        name: 'b',
        tableItem: {
          width: 100,
          render: value => <span>{value}</span>,
        },
      },
      // {
      //   title: formatMessage({ id: 'monitoring compartment' }),
      //   name: 'c',
      //   tableItem: {
      //     width: 100,
      //     render: value => <span>{value}</span>,
      //   },
      // },
      {
        title: formatMessage({ id: 'car.updateTime' }),
        name: 'd',
        tableItem: {
          width: 100,
          render: value => <span>{value}</span>,
        },
      },
      {
        title: formatMessage({ id: 'car xiada' }),
        name: 'e',
        tableItem: {
          width: 100,
          render: value => <span>{value}</span>,
        },
      },
      // {
      //   title: formatMessage({ id: 'app.UserManager.MenuOptions' }),
      //   name: 'purviewShow',
      //   tableItem: {
      //     width: 400,
      //     render: text => (
      //       <Ellipsis tooltip={text} lines={1}>
      //         {text}
      //       </Ellipsis>
      //     ),
      //   },
      //   formItem: {},
      // },
      {
        title: formatMessage({ id: 'app.UserManager.Operation' }),
        tableItem: {
          width: 100,
          // fixed: 'right',
          render: (text, record) => (
            <span>
              <a href="javascript:;" onClick={() => this.updateUser(record)}>
                {formatMessage({ id: 'app.UserManager.Modify' })}
              </a>
              <Divider type="vertical" />
              <Popconfirm
                placement="topRight"
                title={objs.state.textConfirm}
                onConfirm={() => this.deleteRole(record.id)}
                okText="是"
                cancelText="否"
              >
                <a href="javascript:;">{formatMessage({ id: 'app.UserManager.Delete' })}</a>
              </Popconfirm>
            </span>
          ),
        },
      },
    ];
    const dataTableProps = {
      loading: loading,
      columns,
      rowKey: 'id',
      dataItems: StationListNew || {},
      showNum: true,
      isScroll: true,
      onChange: ({ pageNum, pageSize }) => {
        //let objs=this;
        objs.setState({ pageSize: pageSize });
        objs.setState({ pageNums: pageNum });
        let obj = {
          inputVal: objs.state.inpVal,
          pageNum: pageNum,
          pageSize: pageSize,
        };
        this.valnum = obj;
        dispatch({ type: 'StationList/roleList', payload: obj });
      },
      onSelect: (keys, rows) => this.setState({ rows }),
    };
    return (
      <React.Fragment>
        <Layout className="full-layout crud-page" style={{ paddingBottom: '10px' }}>
          {/* <Header style={{ height: 'auto', padding: 0 }}>
            <Toolbar
              appendLeft={
                <Button
                  title={formatMessage({ id: 'app.UserManager.Add' })}
                  onClick={this.onBtnAddUser}
                  icon="plus"
                />
              }
            >
              <div style={{ paddingBottom: '10px' }}>
                <Input
                  // placeholder={formatMessage({ id: 'app.UserManager.RoleName' })}
                  id="myTextInput"
                  ref="myTextInput"
                  className={styles.inputSiz}
                  onChange={e => this.onInpChanger(e)}
                />
                <Button
                  title={formatMessage({ id: 'app.UserManager.Query' })}
                  onClick={this.onBtnSearchClick}
                  style={{ borderradius: 50 }}
                  type="primary"
                  icon="search"
                />
              </div>
            </Toolbar>
          </Header> */}
          <Content>
            {/* <Table columns={columns} dataSource={UserM.list} pagination={pagination} />updateCount={this.state.updateCount} */}
            <DataTable className={styles.tabStyles} {...dataTableProps} />
          </Content>
          <Footer style={{ padding: '10px', textAlign: 'left' }}>
            <Pagination {...dataTableProps} />
          </Footer>
        </Layout>
        <DraggerModal
          title={this.state.modelTitle}
          visible={this.state.modalVisible}
          width={800}
          destroyOnClose={true}
          onCancel={() => this.setModalVisible(false)}
          footer={[
            <Button
              type="primary"
              onClick={() => {
                this.submitButton(this);
              }}
            >
              {formatMessage({ id: 'AlarmTimeOut.Save' })}
            </Button>,
            <Button type="default" onClick={() => this.setModalVisible(false)}>
              {formatMessage({ id: 'AlarmTimeOut.Cancel' })}
            </Button>,
          ]}
        >
          <div className={styles.divMax}>
            {this.state.modalVisible && (
              <ZDYForm
                showTextMsg={this.showTextMsg}
                hidderModel={() => this.setModalVisible(false)}
                msg={this.state.proUserObj}
                onBtnSearchClickRef={this.onBtnSearchClickRef}
                onRef={this.onRef}
                GetInstrumentDetail={GetInstrumentDetail}
              />
            )}
          </div>
        </DraggerModal>
      </React.Fragment>
    );
  }
}
