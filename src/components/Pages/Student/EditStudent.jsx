import React from 'react'
import {Button, Input, Select, InputNumber, Upload, message, DatePicker} from 'antd'
import classes from '../Page.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import Image from '../../common/Image/Image';
const EditStudent = () => {
  
  const [errorMessage, _setErrorMessage] = useState("");
  const [successMessage, _setSuccessMessage] = useState("");
  const { setContentLoading } = useContext(ContentContext);
  const [studentData, setStudentData] = useState({});
  const [gender, setGender] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [status, setStatus] = useState(null);
  const [major_id, setMajorId] = useState("");
  const params = useParams();
  const student_id = params.id;
  const [isValidUserId, setIsValidUserId] = useState(false);

  const [form] = Form.useForm();

  const setErrorMessage = (value) => {
    _setErrorMessage(value);
    _setSuccessMessage("");
  }
  const setSuccessMessage = (value) => {
    _setErrorMessage("");
    _setSuccessMessage(value);
  }

  const handleGenderChange = (value) => {
    setGender(value);
  }

  const handleAcademicYearChange = (value) => {
    setAcademicYear(value);
  }

  const handleStatusChange = (value) => {
    setStatus(value);
  }

  const handleMajorChange = (value) => {
    setMajorId(value);
  }

  useEffect(() => {
    setContentLoading(true);
    const fetchUserData = async () => {
      try {
        const url = `/students/edit-student/${student_id}`
        const response = await axiosClient.get(url)
        console.log(response);
        const { full_name, date_of_birth, gender, address, phone_number, status, major_id, academic_year, image } = response.data.student
        setUserData({ id, full_name, date_of_birth, gender, address, phone_number, image })
        setMajorId(major_id);
        setStatus(status);
        setAcademicYear(academic_year);
        setGender(gender);
        setIsValidUserId(true);
        setContentLoading(false);
      } catch (error) {
        setContentLoading(false);
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
    }
    fetchUserData();
  }, [])

  const onFinish = () => {
    (async () => {
      setContentLoading(true);
      const data = {
        student_id: student_id,
        full_name: full_name,
        image: image,
        gender: gender,
        academic_year: academic_year,
        date_of_birth: date_of_birth,
        phone_number: phone_number,
        address: address,
        major_id: major_id,
        status: status
      }
      console.log(data);
      await axiosClient.put('/students/edit-student', data)
        .then((response) => {
          setSuccessMessage(response.data.message);
          setContentLoading(false);
          resetValue();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.response.data.error);
          setContentLoading(false);
        })
    })()
  }

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0].errors)
    console.log(errorInfo);
  }

  return (
    <div>
      <p className={classes['page__title']}>Edit student</p>
      <form className={classes['add__form']}>
        <div className={classes['add__main']}>
            <div className={classes['add__form-left']}>
                <div className={classes['add__form-row']}>
                    <label htmlFor="sid">Student ID</label>
                    <Input id='sid' disabled value={'bhaf12345'}/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="Gender">Gender:</label>
                    <Select
                        defaultValue="Choose Gender"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        id='Gender'
                        options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                        ]}
                    />
                </div>
                <div className={classes['add__form-row']}>
                  <label htmlFor="email">Email</label>
                  <Input id='email' value={'nvh@fpt.edu.vn'} disabled/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="address">Address</label>
                    <Input id='address'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="status">Status</label>
                    <Input id='status'/>
                </div>
                <div className={classes['add__form-row']}>
                    <label htmlFor="gpa">GPA</label>
                    <Input id='gpa' value={1.2} disabled/>
                </div>
            </div>
          <div className={classes['add__form-right']}>
              <div className={classes['add__form-row']}>
                <label htmlFor="fullname">Full name</label>
                <Input id='fullname'/>
              </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="dob">Date Of Birth</label>
              <DatePicker id='dob'/>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="img" style={{
                marginRight: '10px'
              }}>Image</label>
                <div  className={classes['add__form-row-row']}>
                    <Upload  id='img'>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Image alt='user' src='https://img.freepik.com/free-icon/user_318-159711.jpg' width={50} height={50}/>
                </div>
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="phone">Phone number</label>
              <InputNumber id='phone' min={0}/>
            </div>
            <div className={classes['add__form-row']}>
                <label htmlFor="Major">Major:</label>
                <Select
                    defaultValue="Choose Major"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    id='Major'
                    options={[
                    { value: 'Information and Technology', label: 'Information and Technology' },
                    { value: 'Design', label: 'Design' },
                    ]}
                />
            </div>
            <div className={classes['add__form-row']}>
              <label htmlFor="academicyear">Academic Year</label>
              <InputNumber id='academicyear' min={2018}/>
            </div>
          </div>
        </div>
        <div>
          <Button type='primary'>SUBMIT</Button>
        </div>
      </form>
    </div>
  )
}

export default EditStudent