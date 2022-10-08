import React from "react";
import user1 from "../assets/profiles/user1.png";
import user2 from "../assets/profiles/user2.png";
import user3 from "../assets/profiles/user3.png";
import user4 from "../assets/profiles/user4.png";


import "./Leader_1.css";

export default function leader_1() {
  return (
    <body>
      {/* <div className="MainTop">
        <div className="DivTop">
          <div className="DivTopLeft">
            <h3>1</h3>
            <img src={user1} alt="" className="userLogo_1" />
            <h3>Vatsal Gohil</h3>
          </div>
          <h3>85%</h3>
          <h3>India</h3>
          <h3>Amateur</h3>
        </div>

        <div className="Divbottom">
            <table>

            </table>
        </div>
      </div> */}

      <div className="Table">
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>User Name</td>
                    <td>Win Percentage</td>
                    <td>Country</td>
                    <td>Ranking</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="Winner">1</td>
                    <td> <img src={user1} alt="" /><p>Vatsal</p></td>
                    <td>80%</td>
                    <td>India</td>
                    <td>14</td>

                </tr>
                <tr>
                    <td className="Second">2</td>
                    <td> <img src={user2} alt="" /><p>Parth</p></td>
                    <td>75%</td>
                    <td>USA</td>
                    <td>19</td>

                </tr>
                <tr>
                    <td className="Winner">3</td>
                    <td> <img src={user3} alt="" /><p>Naman</p></td>
                    <td>90%</td>
                    <td>Australia</td>
                    <td>8</td>

                </tr>
                <tr>
                    <td className="Winner">4</td>
                    <td> <img src={user4} alt="" /><p>Khushal</p></td>
                    <td>84%</td>
                    <td>Uganda</td>
                    <td>17</td>

                </tr>
                <tr>
                    <td className="Winner">5</td>
                    <td> <img src={user1} alt="" /><p>Dhaval</p></td>
                    <td>70%</td>
                    <td>Pakistan</td>
                    <td>20</td>

                </tr>
            </tbody>
        </table>

      </div>
    </body>
  );
}
