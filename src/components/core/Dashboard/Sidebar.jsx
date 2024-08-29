import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
import { TbLayoutDashboardFilled } from "react-icons/tb";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div className="relative text-richblack-200">
      <div className=" bg-richblack-800 hidden lg:flex lg:h-[calc(100vh-3.5rem)] lg:min-w-[220px] w-[0px] lg:w-[100px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-0 py-3 lg:py-10">
        <div className="flex flex-row lg:flex-col bg-richblack-800">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="hidden lg:flex mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-row lg:flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

{/* Mobile Menu  */}
      <button onClick={onOpenModal} className="fixed border border-richblack-500 bg-richblack-600 z-[1000] rounded-full p-2 lg:hidden left-[18rem] bottom-10">
          <TbLayoutDashboardFilled className="text-3xl" />
      </button>
      <Modal open={open} onClose={onCloseModal} closeIcon={true} classNames={{modal: 'dashboardModal'}} top >
        <div className="">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink setOpen={setOpen} key={link.id} link={link} iconName={link.icon} />
              )
            })}
          </div>

          <div onClick={()=> setOpen(false)} className="-mt-7">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="lg:px-8 px-3 lg:py-2 my-5 text-sm  text-richblack-300"
            >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-xl text-richblack-900" />
              <span className="text-richblack-900 font-semibold">Logout</span>
            </div>
          </button>
        </div>
      </Modal>
    </div>
  )
}