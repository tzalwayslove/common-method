/************************************************************************
 * 功能：角色表单 （修改|新增）
 * 作者：lee
 * 时间：2020年03月26日
 ****************************************************************************/
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.less';

import { Form, Input, Row, Col, Table, Select, InputNumber } from 'antd';
import { formatMessage } from 'locale';

const FormItem = Form.Item;
const { Option } = Select;

@connect(state => ({
  loading: state.loading,
  StationList: state.StationList,
}))
class From extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inpVal: '',
      isShowFail: false,
    };
  }

  //新增提交保存
  SubmitVal = () => {
    // const { validateFieldsAndScroll } = this.props.form;
    // var bol = false;
    // validateFieldsAndScroll((errors, values) => {
    //   if (errors) {
    //     bol = true;
    //     return;
    //   }
    //   console.log(values);
    //   // this.props.dispatch({ type: 'RoleManage/roleAdd', payload: {} }).then(() => {
    //   //   this.props.onBtnSearchClickRef();
    //   //   this.props.showTextMsg();
    //   // });
    // });
    // if (!bol) {
    //   console.log(bol);
    //   this.props.form.resetFields();
    //   this.props.hidderModel();
    // }
  };

  //修改后提交保存
  SubmitUpdate = () => {
    alert('3213');
    // const { validateFieldsAndScroll } = this.props.form;
    // var bol = false;
    // validateFieldsAndScroll((errors, values) => {
    //   if (errors) {
    //     bol = true;
    //     return;
    //   }

    //   this.props.dispatch({ type: 'RoleManage/roleUpdate', payload: {} }).then(() => {
    //     this.props.onBtnSearchClickRef();
    //     this.props.showTextMsg();
    //   });
    // });
    // if (!bol) {
    //   this.props.form.resetFields();
    //   this.props.hidderModel();
    // }
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  // 灵敏度系数
  onLeftChangeSpeed = (e, record, biaoshi, arrposition) => {
    const { StationList, dispatch } = this.props;
    const { channelist } = StationList;

    // 数组有值 说明是后台数据
    // 后台有数据 不用判断动车还是拖车 直接改数据
    let data = [...channelist];
    data.map(item => {
      if (item.chNo === record.chNo) {
        item[biaoshi][arrposition] = e;
      }
    });
    data = data.concat([]);
    dispatch({
      type: 'StationList/updateState',
      payload: {
        channelist: [...data],
      },
    });
  };
  onchAssetIDLeftChangeSelect = (value, e, record) => {
    const { StationList, dispatch } = this.props;

    const { channelist } = StationList;
    // 首先要确定 修改的数据是模板数据还是后台传来的数据

    // 如果长度为0 说明是模板数据
    // 在进行判断是拖车还是动车

    // 数组有值 说明是后台数据
    // 后台有数据 不用判断动车还是拖车 直接改数据
    let data = [...channelist];
    data.map(item => {
      if (item.chNo === record.chNo) {
        item.chAssetID = value;
      }
    });
    data = data.concat([]);
    dispatch({
      type: 'StationList/updateState',
      payload: {
        channelist: [...data],
      },
    });
  };

  // 前转向配置传感器类型
  onLeftchSensorTypeChange = (value, e, record) => {
    const { StationList, dispatch } = this.props;
    const { channelist } = StationList;

    // 数组有值 说明是后台数据
    // 后台有数据 不用判断动车还是拖车 直接改数据
    let data = [...channelist];
    data.map(item => {
      if (item.chNo === record.chNo) {
        item.chSensorType = value;
        item.chAssetID = 0;

        if (value === 3003) {
          item.chSensitivityList = [10, 0, 10];
        } else {
          item.chSensitivityList = [100];
        }
      }
    });
    data = data.concat([]);
    dispatch({
      type: 'StationList/updateState',
      payload: {
        channelist: [...data],
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { GetInstrumentDetail, StationList } = this.props;
    const { channelist } = StationList;
    const typeList = [
      { key: 3001, name: formatMessage({ id: 'Vibration temperature composite sensor' }) },
      { key: 3002, name: formatMessage({ id: 'Speed sensor' }) },
      { key: 3003, name: formatMessage({ id: 'Trid channel  (temperature)' }) },
      { key: 3004, name: formatMessage({ id: 'Single channel  (temperature)' }) },
      { key: 3005, name: formatMessage({ id: 'Temperature sensor' }) },
      { key: 9999, name: '无' },
    ];

    const columns = [
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
        width: '180px',

        render: (chSensorType, record) => {
          return (
            <Select
              showSearch
              placeholder={formatMessage({ id: 'pleaseSelect' })}
              onChange={(value, e) => {
                this.onLeftchSensorTypeChange(value, e, record);
              }}
              style={{ width: 160 }}
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
        width: '170px',
        render: (chAssetID, record) => {
          return (
            <Select
              showSearch
              placeholder={formatMessage({ id: 'pleaseSelect' })}
              onChange={(value, e) => {
                this.onchAssetIDLeftChangeSelect(value, e, record);
              }}
              style={{ width: 150 }}
              value={chAssetID}
              size={'small'}
            >
              {[].map(v => {
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
        dataIndex: 'chSensitivityList',
        key: 'chSensitivityList',

        render: (chSensitivityList, record) => {
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
                  value={chSensitivityList[0]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'chSensitivityList', '0');
                  }}
                />
                <InputNumber
                  placeholder="y"
                  value={chSensitivityList[1]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'chSensitivityList', '1');
                  }}
                />
                <InputNumber
                  placeholder="z"
                  value={chSensitivityList[2]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'chSensitivityList', '2');
                  }}
                />
              </>
            );
          } else {
            return (
              <>
                <InputNumber
                  value={chSensitivityList[0]}
                  size={'small'}
                  onChange={e => {
                    this.onLeftChangeSpeed(e, record, 'chSensitivityList', '0');
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
      <>
        <Form className={styles.formInp}>
          <Row>
            <Col span={12} className={styles.lyCol}>
              <FormItem>
                <Col span={6} className={styles.alignRight}>
                  <span className={styles.redColor}>*</span>
                  {formatMessage({ id: 'healStatus.stationCode' })}：
                </Col>
                <Col span={18}>
                  {getFieldDecorator('instrCode', {
                    initialValue: GetInstrumentDetail ? GetInstrumentDetail.instrCode : '',
                    rules: [
                      {
                        required: true,
                        message: '必填',
                      },
                    ],
                  })(<Input disabled placeholder={formatMessage({ id: 'train.write' })} />)}
                </Col>
              </FormItem>
            </Col>
            <Col span={12} className={styles.lyCol}>
              <FormItem>
                <Col span={6} className={styles.alignRight}>
                  <span className={styles.redColor}>*</span>
                  {formatMessage({ id: 'train IPC' })}：
                </Col>
                <Col span={18}>
                  {getFieldDecorator('instrServerIp', {
                    initialValue: GetInstrumentDetail ? GetInstrumentDetail.instrServerIp : '',
                    rules: [
                      {
                        required: true,
                        message: '必填',
                      },
                    ],
                  })(<Input placeholder={formatMessage({ id: 'train.write' })} />)}
                </Col>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          bordered={true}
          columns={columns}
          dataSource={channelist}
          pagination={false}
          rowKey="id"
          scroll={{ y: `calc(70vh - 260px)` }}
          size="small"
        />
      </>
    );
  }
}
export default Form.create()(From); //.createForm();
