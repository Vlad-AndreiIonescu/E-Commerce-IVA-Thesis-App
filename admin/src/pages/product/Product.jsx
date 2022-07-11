import { useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [title, setTitle] = useState(product.title);
  const [desc, setDescription] = useState(product.desc);
  const [price, setPrice] = useState(product.price);
  const [file, setFile] = useState(product.img);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);


  const updateProductt = () => {
    let item={title,desc,price,file}
    fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
      })
    })
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Produs</h1>

      </div>
      <div className="productTop">

        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>

          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Titlu</label>
            <input type="text" placeholder={product.title} onChange={(e) => setTitle(e.target.value)}
            />
            <label>Descriere</label>
            <input type="text" placeholder={product.desc} onChange={(e) => setDescription(e.target.value)}
            />
            <label>Pret</label>
            <input type="text" placeholder={product.price} onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg"  />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.value)}/>
            </div>
            <button className="productButton" onClick={updateProductt}>Editare</button>
          </div>
        </form>
      </div>
    </div>
  );
}