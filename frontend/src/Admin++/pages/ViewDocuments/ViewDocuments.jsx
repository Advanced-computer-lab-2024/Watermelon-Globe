import Sidebar from 'Admin++/components/sidebar/Sidebar'
import Layout from '../../components/documents/layout'
import UserDocuments from '../../components/documents/user-documents'
import Navbar from 'Admin++/components/navbar/Navbar'

export default function Page() {
  return (
    <div className="homeAdmin">
      <Sidebar />
      <div className="homeContainerAdmin">
        <Navbar />
      <UserDocuments />
    </div>
    </div>
  )
}

