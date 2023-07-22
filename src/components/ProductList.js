import axios from 'axios';
import React, { useEffect, useState } from 'react';
import imgUpdate from '../images/update.png';
import imgDelete from '../images/delete.png';
import { Link } from 'react-router-dom';

function ProductList(props) {

    const [data, setData] = useState([]);

    const loadData = () => {
        let url = "https://64b92caa79b7c9def6c0b347.mockapi.io/hr/sanpham";
        axios.get(url)
            .then((res) => {
                setData(res.data);
                // console.log(data);
            })
            .catch(err => { console.log(err) })
            .finally(() => { console.log("Load Done!") });
    }

    const actionDelete = (index) => {
        let item = data[index];
        let isDel = window.confirm("Bạn muốn xóa sản phẩm: \n\t" + item.ten + "(" + item.giaban + " vnđ)");
        if (isDel) {
            // Thực hiện gọi API xóa
            let url = "https://64b92caa79b7c9def6c0b347.mockapi.io/hr/sanpham/" + item.id;
            axios.delete(url)
                .then(res => {
                    console.log("Xóa thành công");
                    loadData();
                })
                .catch(err => { console.log(err) });
        }
    }

    useEffect(loadData, []);

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán</th>
                        <th>Ngày nhập</th>
                        <th>Trạng thái</th>
                        <th>Cập nhật</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (<tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.ten}</td>
                        <td>{item.giaban}</td>
                        <td>{item.ngaynhap}</td>
                        <td>{item.trangthai ? "Còn" : "Hết"}</td>
                        <td align='center'><Link to={"/form/" + item.id}><img src={imgUpdate} /></Link></td>
                        <td align='center'><img src={imgDelete} onClick={() => actionDelete(index)} /></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;