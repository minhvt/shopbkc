import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm(props) {
    const [inputs, setInputs] = useState({});
    const nav = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;

        if (e.target.type == "checkbox") {
            value = e.target.checked;
        }
        setInputs({ ...inputs, [id]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (id != null) {
            // Gọi API để CẬP NHẬT dữ liệu
            let url = "https://64b92caa79b7c9def6c0b347.mockapi.io/hr/sanpham/" + id;
            axios.put(url, inputs)
                .then(res => { console.log("Cập nhật thành công") })
                .catch(err => { console.log("Lỗi: " + err) });
        } else {
            // Gọi API để thêm dữ liệu
            let url = "https://64b92caa79b7c9def6c0b347.mockapi.io/hr/sanpham";
            axios.post(url, inputs)
                .then(res => { console.log("Thêm mới thành công") })
                .catch(err => { console.log("Lỗi: " + err) });
        }
        nav("/list");
    }

    const onLoadDetail = () => {
        if (id != null) {
            console.log("Load Detail");
            let url = "https://64b92caa79b7c9def6c0b347.mockapi.io/hr/sanpham/" + id;
            axios.get(url)
                .then(json => {
                    console.log(json.data);
                    setInputs(json.data)
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(onLoadDetail, []);

    return (
        <div>
            <h2>Thêm mới Sản Phẩm</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <td>
                            <input type="text" id="ten" placeholder='Bột giặt OMO' value={inputs.ten} required onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>Giá bán</th>
                        <td>
                            <input type="number" id="giaban" step="500" value={inputs.giaban} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>Ngày nhập hàng</th>
                        <td>
                            <input type="date" id="ngaynhap" value={inputs.ngaynhap} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>Trạng thái</th>
                        <td>
                            <input type="checkbox" id="trangthai" checked={inputs.trangthai} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button>{(id != null) ? "Cập nhật" : "Thêm mới"}</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default ProductForm;