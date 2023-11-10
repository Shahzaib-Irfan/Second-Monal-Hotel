import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';

function Loader() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    textAlign : "center"
  };

  return (
    <div style={{marginTop : "150px" }}>
        <div className="sweet-loading">
            <HashLoader
                color='#000'
                loading={loading}
                css={override}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </div>
  );
}

export default Loader;
