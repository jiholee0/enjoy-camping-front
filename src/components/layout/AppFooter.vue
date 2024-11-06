<template>
    <footer class="footer">
        <div class="info">
            <div class="support">
                <h3>Support</h3>
                <ul>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/team">Team Page</a></li>
                </ul>
            </div>
            <div class="contact">
                <h3>Contact us.</h3>
                <ul>
                    <li><a href="mailto:dlwlg1254@gmail.com">dlwlg1254@gmail.com</a></li>
                    <li><a href="mailto:hsch19@gmail.com">hsch19@gmail.com</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-logo">
            <img src="/images/Logo Light.png" alt="logo" />
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem;
    background-color: #023047;
    color: #ffffff;
    z-index: 1000;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans KR', sans-serif;
}

.info {
    display:flex;
    flex-direction: row;
}
.support,
.contact {
    margin: auto 30px;
    display: flex;
    flex-direction: column;
}

.support h3,
.contact h3 {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    margin-top: 1.0rem;
}

.support ul,
.contact ul {
    font-size: 0.7rem;
    list-style: none;
    padding: 0;
}

.support ul li,
.contact ul li {
    margin: 0.3rem 0;
}

.support ul li a,
.contact ul li a {
    color: #ffffff;
    text-decoration: none;
}

.footer-logo {
    display: flex;
    align-self: flex-end;
    justify-content: flex-end;
}

.footer-logo img {

    height: 30px;
    width: auto;
}

</style>
