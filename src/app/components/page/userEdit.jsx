import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import TextField from "../common/form/textField"
import api from "../../../api"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"

const UserEdit = () => {
    const { userId } = useParams()
    const [professions, setProfession] = useState()
    const [qualities, setQualities] = useState({})
    const [user, setUser] = useState({})
    const history = useHistory()
    const test = user

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
        api.users.getById(userId).then((data) => setUser(data))
    }, [])

    const handleChange = (target) => {
        setUser((prevState) => ({ ...prevState, [target.name]: target.value }))
        test[target.name] = target.value
    }

    const CheckQuality = (qual) => {
        const newQualities = []
        if (qual[0].value) {
            qual.forEach((item) => {
                const qualCheck = Object.values(qualities).find((i) => { return i._id === item.value })
                newQualities.push(qualCheck)
            })
            return newQualities
        }
        return qual
    }

    const CheckProfession = (prof) => {
        if (typeof prof === "string") {
            const userProfession = professions.find((item) => { return item.name === prof })
            return userProfession
        }
        return prof
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(test)
        const updatedUser = {
            name: test.name,
            email: test.email,
            profession: CheckProfession(test.profession),
            sex: test.sex,
            qualities: CheckQuality(test.qualities)
            // qualities: test.qualities.map((quality) => ({ name: quality.label, color: quality.color, _id: quality.value }))
        }
        // console.log(updatedUser)
        // Изменить вид данных который приходит в user. Как?
        api.users.update(userId, updatedUser).then(() => { history.push(`/users/${userId}`) })
    }
    if (user.profession && user.qualities) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange} />
                            <TextField
                                label="Электронная почта"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange} />
                            <SelectField label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                onChange={handleChange}
                                value={test.profession.name} />
                            <RadioField options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберете ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберете ваши качества"
                                defaultValue={user.qualities.map((item) => ({ label: item.name, value: item._id }))} />
                            <button type="submit" className="btn btn-primary w-100 mx-auto">Обновить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

export default UserEdit
