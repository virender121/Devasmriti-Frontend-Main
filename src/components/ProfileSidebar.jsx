import BasicAccordion2 from "./common/Accordion2";

export default function ProfileSidebar ({profiledata}){
    return (
        <div className="profile-menu">

            <div className="profile-menu-content">
                {profiledata.image ? (
                    <img
                        src={`${profiledata.image.domain}${profiledata.image.url}`}
                        alt="Profile"
                        style={{border:"solid #686868 0.5px", objectFit:'cover', height:"100px"}}
                    />
                ) : (
                    <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="Profile" />
                )}
                <h4>{profiledata.fname}</h4>

                <h5>{profiledata.email}</h5>

                <p>+91 {profiledata.mobile_number}</p>

                <div className="my-profile-info">

                    <BasicAccordion2 />

                </div>

                {/* <div className="profile-log-out-btn">

                    <Button>Logout</Button>

                </div> */}
            </div>

        </div>
    );
}