import React from "react";
import "./modal.css";

const BaseModal = ({modalTitle, modalBody}) => {

    return (
        <>
            <div className="modal show fade" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {modalTitle}
                        </div>
                        <div className="modal-body">

                            {modalBody}

                            {/*<div className="form-group">*/}
                            {/*    <input className="form-control" required placeholder="Marka ismi"*/}
                            {/*           value={brandName}*/}
                            {/*           onChange={(e) => setBrandName(e.target.value)}/>*/}
                            {/*</div>*/}

                            {/*<button className="btn btn-primary"*/}
                            {/*        onClick={handleAddBrand}>*/}
                            {/*    Ekle*/}
                            {/*</button>*/}
                            {/*<button className="btn btn-primary" onClick={() => setAddBrand(false)}>İptal</button>*/}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BaseModal