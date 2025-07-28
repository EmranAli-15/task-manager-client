import { Button } from '@mui/material'

export default function Category({ setCategoryId }: { setCategoryId: Function }) {
    return (
        <div>
            <Button variant="outlined">
                <select onChange={(e) => setCategoryId(e.target.value)} className='cursor-pointer outline-0 text-gray-400 h-6'>
                    <option value="687231b05282890fad825d85">Work space</option>
                    <option value="687231b05282890fad825d83">Home work</option>
                    <option value="687231b05282890fad825d84">Idea</option>
                    <option value="687231b05282890fad825d87">Hobby</option>
                    <option value="687231b05282890fad825d82">Education</option>
                    <option value="687231b05282890fad825d86">Business</option>
                </select>
            </Button>
        </div>
    )
}
