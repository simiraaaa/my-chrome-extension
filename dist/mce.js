var pt = Array.isArray, In = Array.prototype.indexOf, jt = Array.from, Dt = Object.defineProperty, We = Object.getOwnPropertyDescriptor, Tn = Object.getOwnPropertyDescriptors, An = Object.prototype, Sn = Array.prototype, xr = Object.getPrototypeOf, sr = Object.isExtensible;
function Rn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Ln() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const z = 2, Vt = 4, wt = 8, tt = 16, ve = 32, Ie = 64, kr = 128, X = 256, ut = 512, V = 1024, ee = 2048, we = 4096, Q = 8192, Pe = 16384, qt = 32768, Kt = 65536, ar = 1 << 17, On = 1 << 18, Yt = 1 << 19, $t = 1 << 20, Mt = 1 << 21, Wt = 1 << 22, ye = 1 << 23, Le = Symbol("$state"), Cn = Symbol(""), Ht = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Nn() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
}
function Dn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Mn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Pn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Un(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Bn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Fn() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function jn() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Vn() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
const gt = 1, bt = 2, Ir = 4, qn = 8, Kn = 16, Yn = 2, F = Symbol(), $n = "http://www.w3.org/1999/xhtml", Wn = "@attach";
function Hn() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
let zn = !1;
function Tr(e) {
  return e === this.v;
}
function Gn(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Ar(e) {
  return !Gn(e, this.v);
}
let te = null;
function ft(e) {
  te = e;
}
function rt(e, t = !1, r) {
  te = {
    p: te,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function nt(e) {
  var t = (
    /** @type {ComponentContext} */
    te
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      qr(n);
  }
  return te = t.p, /** @type {T} */
  {};
}
function Sr() {
  return !0;
}
const Xn = /* @__PURE__ */ new WeakMap();
function Zn(e) {
  var t = L;
  if (t === null)
    return A.f |= ye, e;
  if ((t.f & qt) === 0) {
    if ((t.f & kr) === 0)
      throw !t.parent && e instanceof Error && Rr(e), e;
    t.b.error(e);
  } else
    zt(e, t);
}
function zt(e, t) {
  for (; t !== null; ) {
    if ((t.f & kr) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    t = t.parent;
  }
  throw e instanceof Error && Rr(e), e;
}
function Rr(e) {
  const t = Xn.get(e);
  t && (Dt(e, "message", {
    value: t.message
  }), Dt(e, "stack", {
    value: t.stack
  }));
}
let ot = [];
function Jn() {
  var e = ot;
  ot = [], Rn(e);
}
function mt(e) {
  ot.length === 0 && queueMicrotask(Jn), ot.push(e);
}
function Qn() {
  for (var e = (
    /** @type {Effect} */
    L.b
  ); e !== null && !e.has_pending_snippet(); )
    e = e.parent;
  return e === null && Nn(), e;
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
  var t = z | ee, r = A !== null && (A.f & z) !== 0 ? (
    /** @type {Derived} */
    A
  ) : null;
  return L === null || r !== null && (r.f & X) !== 0 ? t |= X : L.f |= Yt, {
    ctx: te,
    deps: null,
    effects: null,
    equals: Tr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      F
    ),
    wv: 0,
    parent: r ?? L,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function ei(e, t) {
  let r = (
    /** @type {Effect | null} */
    L
  );
  r === null && Dn();
  var n = (
    /** @type {Boundary} */
    r.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), l = Me(
    /** @type {V} */
    F
  ), a = null, u = !A;
  return di(() => {
    try {
      var s = e();
    } catch (p) {
      s = Promise.reject(p);
    }
    var f = () => s;
    i = a?.then(f, f) ?? Promise.resolve(s), a = i;
    var o = (
      /** @type {Batch} */
      M
    ), d = n.pending;
    u && (n.update_pending_count(1), d || o.increment());
    const c = (p, _ = void 0) => {
      a = null, d || o.activate(), _ ? _ !== Ht && (l.f |= ye, Ge(l, _)) : ((l.f & ye) !== 0 && (l.f ^= ye), Ge(l, p)), u && (n.update_pending_count(-1), d || o.decrement()), Nr();
    };
    if (i.then(c, (p) => c(null, p || "unknown")), o)
      return () => {
        queueMicrotask(() => o.neuter());
      };
  }), new Promise((s) => {
    function f(o) {
      function d() {
        o === i ? s(l) : f(i);
      }
      o.then(d, d);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function me(e) {
  const t = /* @__PURE__ */ Gt(e);
  return Gr(t), t;
}
// @__NO_SIDE_EFFECTS__
function ti(e) {
  const t = /* @__PURE__ */ Gt(e);
  return t.equals = Ar, t;
}
function Lr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      Z(
        /** @type {Effect} */
        t[r]
      );
  }
}
function ri(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & z) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Xt(e) {
  var t, r = L;
  pe(ri(e));
  try {
    Lr(e), t = Qr(e);
  } finally {
    pe(r);
  }
  return t;
}
function Or(e) {
  var t = Xt(e);
  if (e.equals(t) || (e.v = t, e.wv = Zr()), !Ue)
    if (Ne !== null)
      Ne.set(e, e.v);
    else {
      var r = (he || (e.f & X) !== 0) && e.deps !== null ? we : V;
      W(e, r);
    }
}
function Cr(e, t, r) {
  const n = Gt;
  if (t.length === 0) {
    r(e.map(n));
    return;
  }
  var i = M, l = (
    /** @type {Effect} */
    L
  ), a = ni(), u = Qn();
  Promise.all(t.map((s) => /* @__PURE__ */ ei(s))).then((s) => {
    i?.activate(), a();
    try {
      r([...e.map(n), ...s]);
    } catch (f) {
      (l.f & Pe) === 0 && zt(f, l);
    }
    i?.deactivate(), Nr();
  }).catch((s) => {
    u.error(s);
  });
}
function ni() {
  var e = L, t = A, r = te;
  return function() {
    pe(e), ae(t), ft(r);
  };
}
function Nr() {
  pe(null), ae(null), ft(null);
}
const je = /* @__PURE__ */ new Set();
let M = null, st = null, Ne = null, ur = /* @__PURE__ */ new Set(), ct = [];
function Dr() {
  const e = (
    /** @type {() => void} */
    ct.shift()
  );
  ct.length > 0 && queueMicrotask(Dr), e();
}
let ze = [], Zt = null, Pt = !1;
class De {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #t = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #l = null;
  /**
   * True if an async effect inside this batch resolved and
   * its parent branch was already deleted
   */
  #s = !1;
  /**
   * Async effects (created inside `async_derived`) encountered during processing.
   * These run after the rest of the batch has updated, since they should
   * always have the latest values
   * @type {Effect[]}
   */
  #n = [];
  /**
   * The same as `#async_effects`, but for effects inside a newly-created
   * `<svelte:boundary>` — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #u = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #a = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #i = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #f = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #c = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #v = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    ze = [], st = null;
    var r = null;
    if (je.size > 1) {
      r = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map();
      for (const [l, a] of this.current)
        r.set(l, { v: l.v, wv: l.wv }), l.v = a;
      for (const l of je)
        if (l !== this)
          for (const [a, u] of l.#r)
            r.has(a) || (r.set(a, { v: a.v, wv: a.wv }), a.v = u);
    }
    for (const l of t)
      this.#h(l);
    if (this.#n.length === 0 && this.#t === 0) {
      this.#d();
      var n = this.#a, i = this.#i;
      this.#a = [], this.#i = [], this.#f = [], st = M, M = null, fr(n), fr(i), M === null ? M = this : je.delete(this), this.#l?.resolve();
    } else
      this.#o(this.#a), this.#o(this.#i), this.#o(this.#f);
    if (r) {
      for (const [l, { v: a, wv: u }] of r)
        l.wv <= u && (l.v = a);
      Ne = null;
    }
    for (const l of this.#n)
      He(l);
    for (const l of this.#u)
      He(l);
    this.#n = [], this.#u = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #h(t) {
    t.f ^= V;
    for (var r = t.first; r !== null; ) {
      var n = r.f, i = (n & (ve | Ie)) !== 0, l = i && (n & V) !== 0, a = l || (n & Q) !== 0 || this.skipped_effects.has(r);
      if (!a && r.fn !== null) {
        if (i)
          r.f ^= V;
        else if ((n & V) === 0)
          if ((n & Vt) !== 0)
            this.#i.push(r);
          else if ((n & Wt) !== 0) {
            var u = r.b?.pending ? this.#u : this.#n;
            u.push(r);
          } else xt(r) && ((r.f & tt) !== 0 && this.#f.push(r), He(r));
        var s = r.first;
        if (s !== null) {
          r = s;
          continue;
        }
      }
      var f = r.parent;
      for (r = r.next; r === null && f !== null; )
        r = f.next, f = f.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #o(t) {
    for (const r of t)
      ((r.f & ee) !== 0 ? this.#c : this.#v).push(r), W(r, V);
    t.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    this.#r.has(t) || this.#r.set(t, r), this.current.set(t, t.v);
  }
  activate() {
    M = this;
  }
  deactivate() {
    M = null, st = null;
    for (const t of ur)
      if (ur.delete(t), t(), M !== null)
        break;
  }
  neuter() {
    this.#s = !0;
  }
  flush() {
    ze.length > 0 ? ii() : this.#d(), M === this && (this.#t === 0 && je.delete(this), this.deactivate());
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #d() {
    if (!this.#s)
      for (const t of this.#e)
        t();
    this.#e.clear();
  }
  increment() {
    this.#t += 1;
  }
  decrement() {
    if (this.#t -= 1, this.#t === 0) {
      for (const t of this.#c)
        W(t, ee), xe(t);
      for (const t of this.#v)
        W(t, we), xe(t);
      this.#a = [], this.#i = [], this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    this.#e.add(t);
  }
  settled() {
    return (this.#l ??= Ln()).promise;
  }
  static ensure() {
    if (M === null) {
      const t = M = new De();
      je.add(M), De.enqueue(() => {
        M === t && t.flush();
      });
    }
    return M;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    ct.length === 0 && queueMicrotask(Dr), ct.unshift(t);
  }
}
function ii() {
  var e = Ce;
  Pt = !0;
  try {
    var t = 0;
    for (cr(!0); ze.length > 0; ) {
      var r = De.ensure();
      if (t++ > 1e3) {
        var n, i;
        li();
      }
      r.process(ze), Ee.clear();
    }
  } finally {
    Pt = !1, cr(e), Zt = null;
  }
}
function li() {
  try {
    Bn();
  } catch (e) {
    zt(e, Zt);
  }
}
function fr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (Pe | Q)) === 0 && xt(n)) {
        var i = M ? M.current.size : 0;
        if (He(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? Wr(n) : n.fn = null), M !== null && M.current.size > i && (n.f & $t) !== 0)
          break;
      }
    }
    for (; r < t; )
      xe(e[r++]);
  }
}
function xe(e) {
  for (var t = Zt = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if (Pt && t === L && (r & tt) !== 0)
      return;
    if ((r & (Ie | ve)) !== 0) {
      if ((r & V) === 0) return;
      t.f ^= V;
    }
  }
  ze.push(t);
}
const Ee = /* @__PURE__ */ new Map();
function Me(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Tr,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function P(e, t) {
  const r = Me(e);
  return Gr(r), r;
}
// @__NO_SIDE_EFFECTS__
function si(e, t = !1, r = !0) {
  const n = Me(e);
  return t || (n.equals = Ar), n;
}
function I(e, t, r = !1) {
  A !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!se || (A.f & ar) !== 0) && Sr() && (A.f & (z | tt | Wt | ar)) !== 0 && !oe?.includes(e) && Vn();
  let n = r ? Ye(t) : t;
  return Ge(e, n);
}
function Ge(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Ue ? Ee.set(e, t) : Ee.set(e, r), e.v = t;
    var n = De.ensure();
    n.capture(e, r), (e.f & z) !== 0 && ((e.f & ee) !== 0 && Xt(
      /** @type {Derived} */
      e
    ), W(e, (e.f & X) === 0 ? V : we)), e.wv = Zr(), Mr(e, ee), L !== null && (L.f & V) !== 0 && (L.f & (ve | Ie)) === 0 && (G === null ? pi([e]) : G.push(e));
  }
  return t;
}
function Oe(e) {
  I(e, e.v + 1);
}
function Mr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, i = 0; i < n; i++) {
      var l = r[i], a = l.f, u = (a & ee) === 0;
      u && W(l, t), (a & z) !== 0 ? Mr(
        /** @type {Derived} */
        l,
        we
      ) : u && xe(
        /** @type {Effect} */
        l
      );
    }
}
function Ye(e) {
  if (typeof e != "object" || e === null || Le in e)
    return e;
  const t = xr(e);
  if (t !== An && t !== Sn)
    return e;
  var r = /* @__PURE__ */ new Map(), n = pt(e), i = /* @__PURE__ */ P(0), l = ce, a = (u) => {
    if (ce === l)
      return u();
    var s = A, f = ce;
    ae(null), dr(l);
    var o = u();
    return ae(s), dr(f), o;
  };
  return n && r.set("length", /* @__PURE__ */ P(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(u, s, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Fn();
        var o = r.get(s);
        return o === void 0 ? o = a(() => {
          var d = /* @__PURE__ */ P(f.value);
          return r.set(s, d), d;
        }) : I(o, f.value, !0), !0;
      },
      deleteProperty(u, s) {
        var f = r.get(s);
        if (f === void 0) {
          if (s in u) {
            const o = a(() => /* @__PURE__ */ P(F));
            r.set(s, o), Oe(i);
          }
        } else
          I(f, F), Oe(i);
        return !0;
      },
      get(u, s, f) {
        if (s === Le)
          return e;
        var o = r.get(s), d = s in u;
        if (o === void 0 && (!d || We(u, s)?.writable) && (o = a(() => {
          var p = Ye(d ? u[s] : F), _ = /* @__PURE__ */ P(p);
          return _;
        }), r.set(s, o)), o !== void 0) {
          var c = h(o);
          return c === F ? void 0 : c;
        }
        return Reflect.get(u, s, f);
      },
      getOwnPropertyDescriptor(u, s) {
        var f = Reflect.getOwnPropertyDescriptor(u, s);
        if (f && "value" in f) {
          var o = r.get(s);
          o && (f.value = h(o));
        } else if (f === void 0) {
          var d = r.get(s), c = d?.v;
          if (d !== void 0 && c !== F)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return f;
      },
      has(u, s) {
        if (s === Le)
          return !0;
        var f = r.get(s), o = f !== void 0 && f.v !== F || Reflect.has(u, s);
        if (f !== void 0 || L !== null && (!o || We(u, s)?.writable)) {
          f === void 0 && (f = a(() => {
            var c = o ? Ye(u[s]) : F, p = /* @__PURE__ */ P(c);
            return p;
          }), r.set(s, f));
          var d = h(f);
          if (d === F)
            return !1;
        }
        return o;
      },
      set(u, s, f, o) {
        var d = r.get(s), c = s in u;
        if (n && s === "length")
          for (var p = f; p < /** @type {Source<number>} */
          d.v; p += 1) {
            var _ = r.get(p + "");
            _ !== void 0 ? I(_, F) : p in u && (_ = a(() => /* @__PURE__ */ P(F)), r.set(p + "", _));
          }
        if (d === void 0)
          (!c || We(u, s)?.writable) && (d = a(() => /* @__PURE__ */ P(void 0)), I(d, Ye(f)), r.set(s, d));
        else {
          c = d.v !== F;
          var g = a(() => Ye(f));
          I(d, g);
        }
        var w = Reflect.getOwnPropertyDescriptor(u, s);
        if (w?.set && w.set.call(o, f), !c) {
          if (n && typeof s == "string") {
            var D = (
              /** @type {Source<number>} */
              r.get("length")
            ), b = Number(s);
            Number.isInteger(b) && b >= D.v && I(D, b + 1);
          }
          Oe(i);
        }
        return !0;
      },
      ownKeys(u) {
        h(i);
        var s = Reflect.ownKeys(u).filter((d) => {
          var c = r.get(d);
          return c === void 0 || c.v !== F;
        });
        for (var [f, o] of r)
          o.v !== F && !(f in u) && s.push(f);
        return s;
      },
      setPrototypeOf() {
        jn();
      }
    }
  );
}
function or(e) {
  try {
    if (e !== null && typeof e == "object" && Le in e)
      return e[Le];
  } catch {
  }
  return e;
}
function ai(e, t) {
  return Object.is(or(e), or(t));
}
var Ut, Pr, Ur, Br;
function ui() {
  if (Ut === void 0) {
    Ut = window, Pr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    Ur = We(t, "firstChild").get, Br = We(t, "nextSibling").get, sr(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), sr(r) && (r.__t = void 0);
  }
}
function yt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function vt(e) {
  return Ur.call(e);
}
// @__NO_SIDE_EFFECTS__
function Jt(e) {
  return Br.call(e);
}
function B(e, t) {
  return /* @__PURE__ */ vt(e);
}
function le(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Jt(n);
  return n;
}
function fi(e) {
  e.textContent = "";
}
function Fr() {
  return !1;
}
function jr(e) {
  L === null && A === null && Un(), A !== null && (A.f & X) !== 0 && L === null && Pn(), Ue && Mn();
}
function oi(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ue(e, t, r, n = !0) {
  var i = L;
  i !== null && (i.f & Q) !== 0 && (e |= Q);
  var l = {
    ctx: te,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | ee,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      He(l), l.f |= qt;
    } catch (s) {
      throw Z(l), s;
    }
  else t !== null && xe(l);
  var a = r && l.deps === null && l.first === null && l.nodes_start === null && l.teardown === null && (l.f & Yt) === 0;
  if (!a && n && (i !== null && oi(l, i), A !== null && (A.f & z) !== 0 && (e & Ie) === 0)) {
    var u = (
      /** @type {Derived} */
      A
    );
    (u.effects ??= []).push(l);
  }
  return l;
}
function Vr(e) {
  const t = ue(wt, null, !1);
  return W(t, V), t.teardown = e, t;
}
function dt(e) {
  jr();
  var t = (
    /** @type {Effect} */
    L.f
  ), r = !A && (t & ve) !== 0 && (t & qt) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      te
    );
    (n.e ??= []).push(e);
  } else
    return qr(e);
}
function qr(e) {
  return ue(Vt | $t, e, !1);
}
function ci(e) {
  return jr(), ue(wt | $t, e, !0);
}
function vi(e) {
  De.ensure();
  const t = ue(Ie, e, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? er(t, () => {
      Z(t), n(void 0);
    }) : (Z(t), n(void 0));
  });
}
function Qt(e) {
  return ue(Vt, e, !1);
}
function di(e) {
  return ue(Wt | Yt, e, !0);
}
function Kr(e, t = 0) {
  return ue(wt | t, e, !0);
}
function Xe(e, t = [], r = []) {
  Cr(t, r, (n) => {
    ue(wt, () => e(...n.map(h)), !0);
  });
}
function Et(e, t = 0) {
  var r = ue(tt | t, e, !0);
  return r;
}
function ke(e, t = !0) {
  return ue(ve, e, !0, t);
}
function Yr(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Ue, n = A;
    vr(!0), ae(null);
    try {
      t.call(null);
    } finally {
      vr(r), ae(n);
    }
  }
}
function $r(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    r.ac?.abort(Ht);
    var n = r.next;
    (r.f & Ie) !== 0 ? r.parent = null : Z(r, t), r = n;
  }
}
function hi(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & ve) === 0 && Z(t), t = r;
  }
}
function Z(e, t = !0) {
  var r = !1;
  (t || (e.f & On) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (_i(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), $r(e, t && !r), ht(e, 0), W(e, Pe);
  var n = e.transitions;
  if (n !== null)
    for (const l of n)
      l.stop();
  Yr(e);
  var i = e.parent;
  i !== null && i.first !== null && Wr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function _i(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(e)
    );
    e.remove(), e = r;
  }
}
function Wr(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function er(e, t) {
  var r = [];
  tr(e, r, !0), Hr(r, () => {
    Z(e), t && t();
  });
}
function Hr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var i of e)
      i.out(n);
  } else
    t();
}
function tr(e, t, r) {
  if ((e.f & Q) === 0) {
    if (e.f ^= Q, e.transitions !== null)
      for (const a of e.transitions)
        (a.is_global || r) && t.push(a);
    for (var n = e.first; n !== null; ) {
      var i = n.next, l = (n.f & Kt) !== 0 || (n.f & ve) !== 0;
      tr(n, t, l ? r : !1), n = i;
    }
  }
}
function rr(e) {
  zr(e, !0);
}
function zr(e, t) {
  if ((e.f & Q) !== 0) {
    e.f ^= Q, (e.f & V) === 0 && (W(e, ee), xe(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & Kt) !== 0 || (r.f & ve) !== 0;
      zr(r, i ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const l of e.transitions)
        (l.is_global || t) && l.in();
  }
}
let Ce = !1;
function cr(e) {
  Ce = e;
}
let Ue = !1;
function vr(e) {
  Ue = e;
}
let A = null, se = !1;
function ae(e) {
  A = e;
}
let L = null;
function pe(e) {
  L = e;
}
let oe = null;
function Gr(e) {
  A !== null && (oe === null ? oe = [e] : oe.push(e));
}
let K = null, H = 0, G = null;
function pi(e) {
  G = e;
}
let Xr = 1, Ze = 0, ce = Ze;
function dr(e) {
  ce = e;
}
let he = !1;
function Zr() {
  return ++Xr;
}
function xt(e) {
  var t = e.f;
  if ((t & ee) !== 0)
    return !0;
  if ((t & we) !== 0) {
    var r = e.deps, n = (t & X) !== 0;
    if (r !== null) {
      var i, l, a = (t & ut) !== 0, u = n && L !== null && !he, s = r.length;
      if ((a || u) && (L === null || (L.f & Pe) === 0)) {
        var f = (
          /** @type {Derived} */
          e
        ), o = f.parent;
        for (i = 0; i < s; i++)
          l = r[i], (a || !l?.reactions?.includes(f)) && (l.reactions ??= []).push(f);
        a && (f.f ^= ut), u && o !== null && (o.f & X) === 0 && (f.f ^= X);
      }
      for (i = 0; i < s; i++)
        if (l = r[i], xt(
          /** @type {Derived} */
          l
        ) && Or(
          /** @type {Derived} */
          l
        ), l.wv > e.wv)
          return !0;
    }
    (!n || L !== null && !he) && W(e, V);
  }
  return !1;
}
function Jr(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !oe?.includes(e))
    for (var i = 0; i < n.length; i++) {
      var l = n[i];
      (l.f & z) !== 0 ? Jr(
        /** @type {Derived} */
        l,
        t,
        !1
      ) : t === l && (r ? W(l, ee) : (l.f & V) !== 0 && W(l, we), xe(
        /** @type {Effect} */
        l
      ));
    }
}
function Qr(e) {
  var t = K, r = H, n = G, i = A, l = he, a = oe, u = te, s = se, f = ce, o = e.f;
  K = /** @type {null | Value[]} */
  null, H = 0, G = null, he = (o & X) !== 0 && (se || !Ce || A === null), A = (o & (ve | Ie)) === 0 ? e : null, oe = null, ft(e.ctx), se = !1, ce = ++Ze, e.ac !== null && (e.ac.abort(Ht), e.ac = null);
  try {
    e.f |= Mt;
    var d = (
      /** @type {Function} */
      (0, e.fn)()
    ), c = e.deps;
    if (K !== null) {
      var p;
      if (ht(e, H), c !== null && H > 0)
        for (c.length = H + K.length, p = 0; p < K.length; p++)
          c[H + p] = K[p];
      else
        e.deps = c = K;
      if (!he || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (o & z) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (p = H; p < c.length; p++)
          (c[p].reactions ??= []).push(e);
    } else c !== null && H < c.length && (ht(e, H), c.length = H);
    if (Sr() && G !== null && !se && c !== null && (e.f & (z | we | ee)) === 0)
      for (p = 0; p < /** @type {Source[]} */
      G.length; p++)
        Jr(
          G[p],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (Ze++, G !== null && (n === null ? n = G : n.push(.../** @type {Source[]} */
    G))), (e.f & ye) !== 0 && (e.f ^= ye), d;
  } catch (_) {
    return Zn(_);
  } finally {
    e.f ^= Mt, K = t, H = r, G = n, A = i, he = l, oe = a, ft(u), se = s, ce = f;
  }
}
function wi(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = In.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  r === null && (t.f & z) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (K === null || !K.includes(t)) && (W(t, we), (t.f & (X | ut)) === 0 && (t.f ^= ut), Lr(
    /** @type {Derived} **/
    t
  ), ht(
    /** @type {Derived} **/
    t,
    0
  ));
}
function ht(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      wi(e, r[n]);
}
function He(e) {
  var t = e.f;
  if ((t & Pe) === 0) {
    W(e, V);
    var r = L, n = Ce;
    L = e, Ce = !0;
    try {
      (t & tt) !== 0 ? hi(e) : $r(e), Yr(e);
      var i = Qr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Xr;
      var l;
    } finally {
      Ce = n, L = r;
    }
  }
}
function h(e) {
  var t = e.f, r = (t & z) !== 0;
  if (A !== null && !se) {
    var n = L !== null && (L.f & Pe) !== 0;
    if (!n && !oe?.includes(e)) {
      var i = A.deps;
      if ((A.f & Mt) !== 0)
        e.rv < Ze && (e.rv = Ze, K === null && i !== null && i[H] === e ? H++ : K === null ? K = [e] : (!he || !K.includes(e)) && K.push(e));
      else {
        (A.deps ??= []).push(e);
        var l = e.reactions;
        l === null ? e.reactions = [A] : l.includes(A) || l.push(A);
      }
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), u = a.parent;
    u !== null && (u.f & X) === 0 && (a.f ^= X);
  }
  if (Ue) {
    if (Ee.has(e))
      return Ee.get(e);
    if (r) {
      a = /** @type {Derived} */
      e;
      var s = a.v;
      return ((a.f & V) === 0 && a.reactions !== null || en(a)) && (s = Xt(a)), Ee.set(a, s), s;
    }
  } else if (r) {
    if (a = /** @type {Derived} */
    e, Ne?.has(a))
      return Ne.get(a);
    xt(a) && Or(a);
  }
  if ((e.f & ye) !== 0)
    throw e.v;
  return e.v;
}
function en(e) {
  if (e.v === F) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ee.has(t) || (t.f & z) !== 0 && en(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function tn(e) {
  var t = se;
  try {
    return se = !0, e();
  } finally {
    se = t;
  }
}
const gi = -7169;
function W(e, t) {
  e.f = e.f & gi | t;
}
function bi(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const mi = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function yi(e) {
  return mi.includes(e);
}
const Ei = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function xi(e) {
  return e = e.toLowerCase(), Ei[e] ?? e;
}
const ki = ["touchstart", "touchmove"];
function Ii(e) {
  return ki.includes(e);
}
function Ti(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, mt(() => {
      document.activeElement === r && e.focus();
    });
  }
}
let hr = !1;
function Ai() {
  hr || (hr = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function rn(e) {
  var t = A, r = L;
  ae(null), pe(null);
  try {
    return e();
  } finally {
    ae(t), pe(r);
  }
}
function Si(e, t, r, n = r) {
  e.addEventListener(t, () => rn(r));
  const i = e.__on_r;
  i ? e.__on_r = () => {
    i(), n(!0);
  } : e.__on_r = () => n(!0), Ai();
}
const nn = /* @__PURE__ */ new Set(), Bt = /* @__PURE__ */ new Set();
function ln(e, t, r, n = {}) {
  function i(l) {
    if (n.capture || $e.call(t, l), !l.cancelBubble)
      return rn(() => r?.call(this, l));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? mt(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function sn(e, t, r, n, i) {
  var l = { capture: n, passive: i }, a = ln(e, t, r, l);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Vr(() => {
    t.removeEventListener(e, a, l);
  });
}
function kt(e) {
  for (var t = 0; t < e.length; t++)
    nn.add(e[t]);
  for (var r of Bt)
    r(e);
}
let _r = null;
function $e(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = e.composedPath?.() || [], l = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  _r = e;
  var a = 0, u = _r === e && e.__root;
  if (u) {
    var s = i.indexOf(u);
    if (s !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    s <= f && (a = s);
  }
  if (l = /** @type {Element} */
  i[a] || e.target, l !== t) {
    Dt(e, "currentTarget", {
      configurable: !0,
      get() {
        return l || r;
      }
    });
    var o = A, d = L;
    ae(null), pe(null);
    try {
      for (var c, p = []; l !== null; ) {
        var _ = l.assignedSlot || l.parentNode || /** @type {any} */
        l.host || null;
        try {
          var g = l["__" + n];
          if (g != null && (!/** @type {any} */
          l.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === l))
            if (pt(g)) {
              var [w, ...D] = g;
              w.apply(l, [e, ...D]);
            } else
              g.call(l, e);
        } catch (b) {
          c ? p.push(b) : c = b;
        }
        if (e.cancelBubble || _ === t || _ === null)
          break;
        l = _;
      }
      if (c) {
        for (let b of p)
          queueMicrotask(() => {
            throw b;
          });
        throw c;
      }
    } finally {
      e.__root = t, delete e.currentTarget, ae(o), pe(d);
    }
  }
}
function an(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function un(e, t) {
  var r = (
    /** @type {Effect} */
    L
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function Be(e, t) {
  var r = (t & Yn) !== 0, n, i = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = an(i ? e : "<!>" + e), n = /** @type {Node} */
    /* @__PURE__ */ vt(n));
    var l = (
      /** @type {TemplateNode} */
      r || Pr ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return un(l, l), l;
  };
}
// @__NO_SIDE_EFFECTS__
function Ri(e, t, r = "svg") {
  var n = !e.startsWith("<!>"), i = `<${r}>${n ? e : "<!>" + e}</${r}>`, l;
  return () => {
    if (!l) {
      var a = (
        /** @type {DocumentFragment} */
        an(i)
      ), u = (
        /** @type {Element} */
        /* @__PURE__ */ vt(a)
      );
      l = /** @type {Element} */
      /* @__PURE__ */ vt(u);
    }
    var s = (
      /** @type {TemplateNode} */
      l.cloneNode(!0)
    );
    return un(s, s), s;
  };
}
// @__NO_SIDE_EFFECTS__
function fn(e, t) {
  return /* @__PURE__ */ Ri(e, t, "svg");
}
function _e(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function Je(e, t) {
  var r = t == null ? "" : typeof t == "object" ? t + "" : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = r + "");
}
function ol(e, t) {
  return Li(e, t);
}
const Se = /* @__PURE__ */ new Map();
function Li(e, { target: t, anchor: r, props: n = {}, events: i, context: l, intro: a = !0 }) {
  ui();
  var u = /* @__PURE__ */ new Set(), s = (d) => {
    for (var c = 0; c < d.length; c++) {
      var p = d[c];
      if (!u.has(p)) {
        u.add(p);
        var _ = Ii(p);
        t.addEventListener(p, $e, { passive: _ });
        var g = Se.get(p);
        g === void 0 ? (document.addEventListener(p, $e, { passive: _ }), Se.set(p, 1)) : Se.set(p, g + 1);
      }
    }
  };
  s(jt(nn)), Bt.add(s);
  var f = void 0, o = vi(() => {
    var d = r ?? t.appendChild(yt());
    return ke(() => {
      if (l) {
        rt({});
        var c = (
          /** @type {ComponentContext} */
          te
        );
        c.c = l;
      }
      i && (n.$$events = i), f = e(d, n) || {}, l && nt();
    }), () => {
      for (var c of u) {
        t.removeEventListener(c, $e);
        var p = (
          /** @type {number} */
          Se.get(c)
        );
        --p === 0 ? (document.removeEventListener(c, $e), Se.delete(c)) : Se.set(c, p);
      }
      Bt.delete(s), d !== r && d.parentNode?.removeChild(d);
    };
  });
  return Oi.set(f, o), f;
}
let Oi = /* @__PURE__ */ new WeakMap();
function pr(e, t, r = !1) {
  var n = e, i = null, l = null, a = F, u = r ? Kt : 0, s = !1;
  const f = (p, _ = !0) => {
    s = !0, c(_, p);
  };
  var o = null;
  function d() {
    o !== null && (o.lastChild.remove(), n.before(o), o = null);
    var p = a ? i : l, _ = a ? l : i;
    p && rr(p), _ && er(_, () => {
      a ? l = null : i = null;
    });
  }
  const c = (p, _) => {
    if (a !== (a = p)) {
      var g = Fr(), w = n;
      if (g && (o = document.createDocumentFragment(), o.append(w = yt())), a ? i ??= _ && ke(() => _(w)) : l ??= _ && ke(() => _(w)), g) {
        var D = (
          /** @type {Batch} */
          M
        ), b = a ? i : l, x = a ? l : i;
        b && D.skipped_effects.delete(b), x && D.skipped_effects.add(x), D.add_callback(d);
      } else
        d();
    }
  };
  Et(() => {
    s = !1, t(f), s || c(null, null);
  }, u);
}
function Ci(e, t, r) {
  for (var n = e.items, i = [], l = t.length, a = 0; a < l; a++)
    tr(t[a].e, i, !0);
  var u = l > 0 && i.length === 0 && r !== null;
  if (u) {
    var s = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    fi(s), s.append(
      /** @type {Element} */
      r
    ), n.clear(), ie(e, t[0].prev, t[l - 1].next);
  }
  Hr(i, () => {
    for (var f = 0; f < l; f++) {
      var o = t[f];
      u || (n.delete(o.k), ie(e, o.prev, o.next)), Z(o.e, !u);
    }
  });
}
function Tt(e, t, r, n, i, l = null) {
  var a = e, u = { flags: t, items: /* @__PURE__ */ new Map(), first: null }, s = (t & Ir) !== 0;
  if (s) {
    var f = (
      /** @type {Element} */
      e
    );
    a = f.appendChild(yt());
  }
  var o = null, d = !1, c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ ti(() => {
    var D = r();
    return pt(D) ? D : D == null ? [] : jt(D);
  }), _, g;
  function w() {
    Ni(
      g,
      _,
      u,
      c,
      a,
      i,
      t,
      n,
      r
    ), l !== null && (_.length === 0 ? o ? rr(o) : o = ke(() => l(a)) : o !== null && er(o, () => {
      o = null;
    }));
  }
  Et(() => {
    g ??= /** @type {Effect} */
    L, _ = h(p);
    var D = _.length;
    if (!(d && D === 0)) {
      d = D === 0;
      var b, x, T, S;
      if (Fr()) {
        var m = /* @__PURE__ */ new Set(), O = (
          /** @type {Batch} */
          M
        );
        for (x = 0; x < D; x += 1) {
          T = _[x], S = n(T, x);
          var q = u.items.get(S) ?? c.get(S);
          q ? (t & (gt | bt)) !== 0 && on(q, T, x, t) : (b = cn(
            null,
            u,
            null,
            null,
            T,
            S,
            x,
            i,
            t,
            r,
            !0
          ), c.set(S, b)), m.add(S);
        }
        for (const [Y, re] of u.items)
          m.has(Y) || O.skipped_effects.add(re.e);
        O.add_callback(w);
      } else
        w();
      h(p);
    }
  });
}
function Ni(e, t, r, n, i, l, a, u, s) {
  var f = (a & qn) !== 0, o = (a & (gt | bt)) !== 0, d = t.length, c = r.items, p = r.first, _ = p, g, w = null, D, b = [], x = [], T, S, m, O;
  if (f)
    for (O = 0; O < d; O += 1)
      T = t[O], S = u(T, O), m = c.get(S), m !== void 0 && (m.a?.measure(), (D ??= /* @__PURE__ */ new Set()).add(m));
  for (O = 0; O < d; O += 1) {
    if (T = t[O], S = u(T, O), m = c.get(S), m === void 0) {
      var q = n.get(S);
      if (q !== void 0) {
        n.delete(S), c.set(S, q);
        var Y = w ? w.next : _;
        ie(r, w, q), ie(r, q, Y), At(q, Y, i), w = q;
      } else {
        var re = _ ? (
          /** @type {TemplateNode} */
          _.e.nodes_start
        ) : i;
        w = cn(
          re,
          r,
          w,
          w === null ? r.first : w.next,
          T,
          S,
          O,
          l,
          a,
          s
        );
      }
      c.set(S, w), b = [], x = [], _ = w.next;
      continue;
    }
    if (o && on(m, T, O, a), (m.e.f & Q) !== 0 && (rr(m.e), f && (m.a?.unfix(), (D ??= /* @__PURE__ */ new Set()).delete(m))), m !== _) {
      if (g !== void 0 && g.has(m)) {
        if (b.length < x.length) {
          var ge = x[0], ne;
          w = ge.prev;
          var it = b[0], Fe = b[b.length - 1];
          for (ne = 0; ne < b.length; ne += 1)
            At(b[ne], ge, i);
          for (ne = 0; ne < x.length; ne += 1)
            g.delete(x[ne]);
          ie(r, it.prev, Fe.next), ie(r, w, it), ie(r, Fe, ge), _ = ge, w = Fe, O -= 1, b = [], x = [];
        } else
          g.delete(m), At(m, _, i), ie(r, m.prev, m.next), ie(r, m, w === null ? r.first : w.next), ie(r, w, m), w = m;
        continue;
      }
      for (b = [], x = []; _ !== null && _.k !== S; )
        (_.e.f & Q) === 0 && (g ??= /* @__PURE__ */ new Set()).add(_), x.push(_), _ = _.next;
      if (_ === null)
        continue;
      m = _;
    }
    b.push(m), w = m, _ = m.next;
  }
  if (_ !== null || g !== void 0) {
    for (var be = g === void 0 ? [] : jt(g); _ !== null; )
      (_.e.f & Q) === 0 && be.push(_), _ = _.next;
    var fe = be.length;
    if (fe > 0) {
      var Te = (a & Ir) !== 0 && d === 0 ? i : null;
      if (f) {
        for (O = 0; O < fe; O += 1)
          be[O].a?.measure();
        for (O = 0; O < fe; O += 1)
          be[O].a?.fix();
      }
      Ci(r, be, Te);
    }
  }
  f && mt(() => {
    if (D !== void 0)
      for (m of D)
        m.a?.apply();
  }), e.first = r.first && r.first.e, e.last = w && w.e;
  for (var It of n.values())
    Z(It.e);
  n.clear();
}
function on(e, t, r, n) {
  (n & gt) !== 0 && Ge(e.v, t), (n & bt) !== 0 ? Ge(
    /** @type {Value<number>} */
    e.i,
    r
  ) : e.i = r;
}
function cn(e, t, r, n, i, l, a, u, s, f, o) {
  var d = (s & gt) !== 0, c = (s & Kn) === 0, p = d ? c ? /* @__PURE__ */ si(i, !1, !1) : Me(i) : i, _ = (s & bt) === 0 ? a : Me(a), g = {
    i: _,
    v: p,
    k: l,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (e === null) {
      var w = document.createDocumentFragment();
      w.append(e = yt());
    }
    return g.e = ke(() => u(
      /** @type {Node} */
      e,
      p,
      _,
      f
    ), zn), g.e.prev = r && r.e, g.e.next = n && n.e, r === null ? o || (t.first = g) : (r.next = g, r.e.next = g.e), n !== null && (n.prev = g, n.e.prev = g.e), g;
  } finally {
  }
}
function At(e, t, r) {
  for (var n = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : r, i = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : r, l = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); l !== null && l !== n; ) {
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Jt(l)
    );
    i.before(l), l = a;
  }
}
function ie(e, t, r) {
  t === null ? e.first = r : (t.next = r, t.e.next = r && r.e), r !== null && (r.prev = t, r.e.prev = t && t.e);
}
function Di(e, t) {
  var r = void 0, n;
  Et(() => {
    r !== (r = t()) && (n && (Z(n), n = null), r && (n = ke(() => {
      Qt(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function vn(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = vn(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Mi() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = vn(e)) && (n && (n += " "), n += t);
  return n;
}
function Pi(e) {
  return typeof e == "object" ? Mi(e) : e ?? "";
}
const wr = [...` 	
\r\f \v\uFEFF`];
function Ui(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (r) {
    for (var i in r)
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var l = i.length, a = 0; (a = n.indexOf(i, a)) >= 0; ) {
          var u = a + l;
          (a === 0 || wr.includes(n[a - 1])) && (u === n.length || wr.includes(n[u])) ? n = (a === 0 ? "" : n.substring(0, a)) + n.substring(u + 1) : a = u;
        }
  }
  return n === "" ? null : n;
}
function gr(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var i in e) {
    var l = e[i];
    l != null && l !== "" && (n += " " + i + ": " + l + r);
  }
  return n;
}
function St(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function Bi(e, t) {
  if (t) {
    var r = "", n, i;
    if (Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var l = !1, a = 0, u = !1, s = [];
      n && s.push(...Object.keys(n).map(St)), i && s.push(...Object.keys(i).map(St));
      var f = 0, o = -1;
      const g = e.length;
      for (var d = 0; d < g; d++) {
        var c = e[d];
        if (u ? c === "/" && e[d - 1] === "*" && (u = !1) : l ? l === c && (l = !1) : c === "/" && e[d + 1] === "*" ? u = !0 : c === '"' || c === "'" ? l = c : c === "(" ? a++ : c === ")" && a--, !u && l === !1 && a === 0) {
          if (c === ":" && o === -1)
            o = d;
          else if (c === ";" || d === g - 1) {
            if (o !== -1) {
              var p = St(e.substring(f, o).trim());
              if (!s.includes(p)) {
                c !== ";" && d++;
                var _ = e.substring(f, d).trim();
                r += " " + _ + ";";
              }
            }
            f = d + 1, o = -1;
          }
        }
      }
    }
    return n && (r += gr(n)), i && (r += gr(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function dn(e, t, r, n, i, l) {
  var a = e.__className;
  if (a !== r || a === void 0) {
    var u = Ui(r, n, l);
    u == null ? e.removeAttribute("class") : t ? e.className = u : e.setAttribute("class", u), e.__className = r;
  } else if (l && i !== l)
    for (var s in l) {
      var f = !!l[s];
      (i == null || f !== !!i[s]) && e.classList.toggle(s, f);
    }
  return l;
}
function Rt(e, t = {}, r, n) {
  for (var i in r) {
    var l = r[i];
    t[i] !== l && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, l, n));
  }
}
function Fi(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var l = Bi(t, n);
    l == null ? e.removeAttribute("style") : e.style.cssText = l, e.__style = t;
  } else n && (Array.isArray(n) ? (Rt(e, r?.[0], n[0]), Rt(e, r?.[1], n[1], "important")) : Rt(e, r, n));
  return n;
}
function Ft(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!pt(t))
      return Hn();
    for (var n of e.options)
      n.selected = t.includes(br(n));
    return;
  }
  for (n of e.options) {
    var i = br(n);
    if (ai(i, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function ji(e) {
  var t = new MutationObserver(() => {
    Ft(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Vr(() => {
    t.disconnect();
  });
}
function br(e) {
  return "__value" in e ? e.__value : e.value;
}
const Ve = Symbol("class"), qe = Symbol("style"), hn = Symbol("is custom element"), _n = Symbol("is html");
function Vi(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function Qe(e, t, r, n) {
  var i = wn(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[Cn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && gn(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function qi(e, t, r, n, i = !1) {
  var l = wn(e), a = l[hn], u = !l[_n], s = t || {}, f = e.tagName === "OPTION";
  for (var o in t)
    o in r || (r[o] = null);
  r.class ? r.class = Pi(r.class) : r[Ve] && (r.class = null), r[qe] && (r.style ??= null);
  var d = gn(e);
  for (const b in r) {
    let x = r[b];
    if (f && b === "value" && x == null) {
      e.value = e.__value = "", s[b] = x;
      continue;
    }
    if (b === "class") {
      var c = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      dn(e, c, x, n, t?.[Ve], r[Ve]), s[b] = x, s[Ve] = r[Ve];
      continue;
    }
    if (b === "style") {
      Fi(e, x, t?.[qe], r[qe]), s[b] = x, s[qe] = r[qe];
      continue;
    }
    var p = s[b];
    if (!(x === p && !(x === void 0 && e.hasAttribute(b)))) {
      s[b] = x;
      var _ = b[0] + b[1];
      if (_ !== "$$")
        if (_ === "on") {
          const T = {}, S = "$$" + b;
          let m = b.slice(2);
          var g = yi(m);
          if (bi(m) && (m = m.slice(0, -7), T.capture = !0), !g && p) {
            if (x != null) continue;
            e.removeEventListener(m, s[S], T), s[S] = null;
          }
          if (x != null)
            if (g)
              e[`__${m}`] = x, kt([m]);
            else {
              let O = function(q) {
                s[b].call(this, q);
              };
              s[S] = ln(m, e, O, T);
            }
          else g && (e[`__${m}`] = void 0);
        } else if (b === "style")
          Qe(e, b, x);
        else if (b === "autofocus")
          Ti(
            /** @type {HTMLElement} */
            e,
            !!x
          );
        else if (!a && (b === "__value" || b === "value" && x != null))
          e.value = e.__value = x;
        else if (b === "selected" && f)
          Vi(
            /** @type {HTMLOptionElement} */
            e,
            x
          );
        else {
          var w = b;
          u || (w = xi(w));
          var D = w === "defaultValue" || w === "defaultChecked";
          if (x == null && !a && !D)
            if (l[b] = null, w === "value" || w === "checked") {
              let T = (
                /** @type {HTMLInputElement} */
                e
              );
              const S = t === void 0;
              if (w === "value") {
                let m = T.defaultValue;
                T.removeAttribute(w), T.defaultValue = m, T.value = T.__value = S ? m : null;
              } else {
                let m = T.defaultChecked;
                T.removeAttribute(w), T.defaultChecked = m, T.checked = S ? m : !1;
              }
            } else
              e.removeAttribute(b);
          else D || d.includes(w) && (a || typeof x != "string") ? e[w] = x : typeof x != "function" && Qe(e, w, x);
        }
    }
  }
  return s;
}
function pn(e, t, r = [], n = [], i, l = !1) {
  Cr(r, n, (a) => {
    var u = void 0, s = {}, f = e.nodeName === "SELECT", o = !1;
    if (Et(() => {
      var c = t(...a.map(h)), p = qi(e, u, c, i, l);
      o && f && "value" in c && Ft(
        /** @type {HTMLSelectElement} */
        e,
        c.value
      );
      for (let g of Object.getOwnPropertySymbols(s))
        c[g] || Z(s[g]);
      for (let g of Object.getOwnPropertySymbols(c)) {
        var _ = c[g];
        g.description === Wn && (!u || _ !== u[g]) && (s[g] && Z(s[g]), s[g] = ke(() => Di(e, () => _))), p[g] = _;
      }
      u = p;
    }), f) {
      var d = (
        /** @type {HTMLSelectElement} */
        e
      );
      Qt(() => {
        Ft(
          d,
          /** @type {Record<string | symbol, any>} */
          u.value,
          !0
        ), ji(d);
      });
    }
    o = !0;
  });
}
function wn(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [hn]: e.nodeName.includes("-"),
      [_n]: e.namespaceURI === $n
    }
  );
}
var mr = /* @__PURE__ */ new Map();
function gn(e) {
  var t = mr.get(e.nodeName);
  if (t) return t;
  mr.set(e.nodeName, t = []);
  for (var r, n = e, i = Element.prototype; i !== n; ) {
    r = Tn(n);
    for (var l in r)
      r[l].set && t.push(l);
    n = xr(n);
  }
  return t;
}
function Ki(e, t, r = t) {
  var n = /* @__PURE__ */ new WeakSet();
  Si(e, "input", (i) => {
    var l = i ? e.defaultValue : e.value;
    if (l = Lt(e) ? Ot(l) : l, r(l), M !== null && n.add(M), l !== (l = t())) {
      var a = e.selectionStart, u = e.selectionEnd;
      e.value = l ?? "", u !== null && (e.selectionStart = a, e.selectionEnd = Math.min(u, e.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  tn(t) == null && e.value && (r(Lt(e) ? Ot(e.value) : e.value), M !== null && n.add(M)), Kr(() => {
    var i = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        st ?? M
      );
      if (n.has(l))
        return;
    }
    Lt(e) && i === Ot(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function Lt(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Ot(e) {
  return e === "" ? null : +e;
}
function yr(e, t) {
  return e === t || e?.[Le] === t;
}
function _t(e = {}, t, r, n) {
  return Qt(() => {
    var i, l;
    return Kr(() => {
      i = l, l = [], tn(() => {
        e !== r(...l) && (t(e, ...l), i && yr(r(...i), e) && t(null, ...i));
      });
    }), () => {
      mt(() => {
        l && yr(r(...l), e) && t(null, ...l);
      });
    };
  }), e;
}
const Yi = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
// @__NO_SIDE_EFFECTS__
function bn(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    Yi
  );
}
function Re(e, t, r, n) {
  var i = (
    /** @type {V} */
    n
  ), l = !0, a = () => (l && (l = !1, i = /** @type {V} */
  n), i), u;
  u = /** @type {V} */
  e[t], u === void 0 && n !== void 0 && (u = a());
  var s;
  return s = () => {
    var f = (
      /** @type {V} */
      e[t]
    );
    return f === void 0 ? a() : (l = !0, f);
  }, s;
}
const $i = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add($i);
const at = {
  close() {
    setTimeout(() => {
      close();
    }, 500);
  },
  reg: {
    createSearch(e, t) {
      var r = /[-\/\\^$*+?.()|[\]{}]/, n = "";
      for (let i = 0; i < e.length; i++) {
        let l = e[i];
        if (r.test(l) ? n += `\\${l}` : n += l, i < e.length - 1) {
          let a = e[i + 1];
          r.test(a) && (a = `\\${a}`), n += `[^${a}]*`;
        }
      }
      return new RegExp(n, t);
    }
  }
}, lt = {
  getAll() {
    return chrome.windows.getAll();
  },
  getCurrent() {
    return chrome.windows.getCurrent();
  },
  activate(e) {
    return chrome.windows.update(e, { focused: !0 });
  }
}, Ct = {
  async getAll() {
    const e = await chrome.bookmarks.getTree();
    var t = [], r = (n, i) => {
      if (n.bookmarkTreeNode?.children) {
        var l = n.title === "";
        n.bookmarkTreeNode.children.forEach((a) => {
          let u = {
            id: a.id,
            title: a.title || "",
            url: a.url || "",
            bookmarkTreeNode: a
          }, s = "";
          i ? s = a.title.replace(/\//g, "") : (s = n.path || "", s += "/" + a.title.replace(/\//g, "")), u.path = s.replace(/^\//g, ""), r(u, l);
        });
      } else
        n.type = "bookmark", /^javascript\:/.test(n.url) ? (n.isBookmarklet = !0, n.script = n.url, n.url = "bookmarklet") : n.favIconUrl = mn(n.url), t.push(n);
    };
    return e.forEach((n) => r({
      id: n.id,
      title: n.title,
      url: n.url || "",
      bookmarkTreeNode: n
    }, !0)), t;
  }
}, de = {
  get(e) {
    return chrome.tabs.get(e);
  },
  getAll(e) {
    return chrome.tabs.query({ windowId: e });
  },
  async getCurrent() {
    return (await chrome.tabs.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      active: !0
    }))[0];
  },
  // TODO: サブドメインで分割、優先順位を考慮する (オプションページで設定)
  async sort(e = !1) {
    var t = e ? 1 : -1;
    return await new Promise(async (r) => {
      var n = [];
      for (const l of await lt.getAll()) {
        var i = await de.getAll(l.id);
        i = await new Promise(
          (a) => chrome.tabs.move(
            i.sort((u, s) => (u.url || "") < (s.url || "") ? t : -t).map((u) => u.id || 0),
            { index: -1 },
            (u) => a(u)
          )
        ), n = n.concat(i);
      }
      r(n);
    });
  },
  async getAllByAllWindow() {
    const e = await lt.getAll();
    return (await Promise.all(e.map((r) => de.getAll(r.id)))).flat();
  },
  async activate(e) {
    return (await lt.getCurrent()).id !== e.windowId && await lt.activate(e.windowId), chrome.tabs.update(e.id, { active: !0 });
  }
}, Ke = {
  get(e) {
    return new Promise((t) => chrome.storage.local.get(e, (r) => t(typeof e == "string" ? r[e] : r)));
  },
  set(e) {
    return chrome.storage.local.set(e);
  }
}, cl = {
  STORAGE_KEY: "util_tabHistory",
  LOCK_STORAGE_KEY: "util_tabHistory_lock",
  _history: [],
  _historyIndex: 0,
  async load() {
    var e = await Ke.get(this.STORAGE_KEY);
    Object.assign(this, e);
  },
  save() {
    return Ke.set({
      [this.STORAGE_KEY]: {
        _history: this._history,
        _historyIndex: this._historyIndex
      }
    });
  },
  // 履歴内に同じタブがある場合はそのタブを消してから push
  push(e) {
    this._historyIndex !== 0 && (this._history = this._history.slice(0, this._history.length - this._historyIndex));
    var t = this._history.findIndex((r) => r === e.tabId);
    t !== -1 && this._history.splice(t, 1), this._history.push(e.tabId), this._historyIndex = 0;
  },
  // 現在のタブを取得
  get current() {
    return this._history[this._history.length - this._historyIndex - 1];
  },
  // カウンターを進めて取得
  back() {
    return this._historyIndex = Math.min(this._history.length - 1, this._historyIndex + 1), this.current;
  },
  // カウンターを戻して取得
  forward() {
    return this._historyIndex = Math.max(0, this._historyIndex - 1), this.current;
  },
  lock() {
    return Ke.set({ [this.LOCK_STORAGE_KEY]: !0 });
  },
  unlock() {
    return Ke.set({ [this.LOCK_STORAGE_KEY]: !1 });
  },
  isLocked() {
    return Ke.get(this.LOCK_STORAGE_KEY);
  },
  isFirst() {
    return this._historyIndex >= this._history.length - 1;
  },
  isLast() {
    return this._historyIndex <= 0;
  }
};
function Wi(e, t) {
  let r;
  return Object.assign((...n) => {
    clearTimeout(r), r = setTimeout(() => e(...n), t);
  }, {
    cancel: () => clearTimeout(r)
  });
}
const Nt = {
  async getAll() {
    const e = await chrome.readingList.query({}), t = (i) => ({
      id: i.url,
      title: i.title,
      url: i.url,
      favIconUrl: mn(i.url),
      type: "readingList",
      hasBeenRead: i.hasBeenRead
    }), r = e.filter((i) => !i.hasBeenRead).sort((i, l) => l.creationTime - i.creationTime), n = e.filter((i) => i.hasBeenRead).sort((i, l) => l.creationTime - i.creationTime).slice(0, 30);
    return [...r, ...n].map(t);
  },
  remove(e) {
    return chrome.readingList.removeEntry({ url: e });
  },
  toggleRead(e, t) {
    return chrome.readingList.updateEntry({ url: e, hasBeenRead: t });
  }
};
function mn(e) {
  const t = new URL(chrome.runtime.getURL("/_favicon/"));
  return t.searchParams.set("pageUrl", e), t.searchParams.set("size", "32"), t.toString();
}
var Hi = ["forEach", "isDisjointFrom", "isSubsetOf", "isSupersetOf"], zi = ["difference", "intersection", "symmetricDifference", "union"], Er = !1;
class et extends Set {
  /** @type {Map<T, Source<boolean>>} */
  #r = /* @__PURE__ */ new Map();
  #e = /* @__PURE__ */ P(0);
  #t = /* @__PURE__ */ P(0);
  #l = ce || -1;
  /**
   * @param {Iterable<T> | null | undefined} [value]
   */
  constructor(t) {
    if (super(), t) {
      for (var r of t)
        super.add(r);
      this.#t.v = super.size;
    }
    Er || this.#n();
  }
  /**
   * If the source is being created inside the same reaction as the SvelteSet instance,
   * we use `state` so that it will not be a dependency of the reaction. Otherwise we
   * use `source` so it will be.
   *
   * @template T
   * @param {T} value
   * @returns {Source<T>}
   */
  #s(t) {
    return ce === this.#l ? /* @__PURE__ */ P(t) : Me(t);
  }
  // We init as part of the first instance so that we can treeshake this class
  #n() {
    Er = !0;
    var t = et.prototype, r = Set.prototype;
    for (const n of Hi)
      t[n] = function(...i) {
        return h(this.#e), r[n].apply(this, i);
      };
    for (const n of zi)
      t[n] = function(...i) {
        h(this.#e);
        var l = (
          /** @type {Set<T>} */
          r[n].apply(this, i)
        );
        return new et(l);
      };
  }
  /** @param {T} value */
  has(t) {
    var r = super.has(t), n = this.#r, i = n.get(t);
    if (i === void 0) {
      if (!r)
        return h(this.#e), !1;
      i = this.#s(!0), n.set(t, i);
    }
    return h(i), r;
  }
  /** @param {T} value */
  add(t) {
    return super.has(t) || (super.add(t), I(this.#t, super.size), Oe(this.#e)), this;
  }
  /** @param {T} value */
  delete(t) {
    var r = super.delete(t), n = this.#r, i = n.get(t);
    return i !== void 0 && (n.delete(t), I(i, !1)), r && (I(this.#t, super.size), Oe(this.#e)), r;
  }
  clear() {
    if (super.size !== 0) {
      super.clear();
      var t = this.#r;
      for (var r of t.values())
        I(r, !1);
      t.clear(), I(this.#t, 0), Oe(this.#e);
    }
  }
  keys() {
    return this.values();
  }
  values() {
    return h(this.#e), super.values();
  }
  entries() {
    return h(this.#e), super.entries();
  }
  [Symbol.iterator]() {
    return this.keys();
  }
  get size() {
    return h(this.#t);
  }
}
var Gi = /* @__PURE__ */ Be('<button><div class="mr4 flex-fixed s20 f fh bg-white rounded-4"><img class="object-fit-cover s16" alt=""/></div> <div><div class="line-clamp-2 word-break-all white-space-pre-wrap w-full fs12 lh12"> </div></div></button>');
function Xi(e, t) {
  rt(t, !0);
  let r = Re(t, "selected", 3, !1), n = /* @__PURE__ */ bn(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "favIconUrl",
    "name",
    "selected"
  ]), i = /* @__PURE__ */ P(void 0), l = !1;
  dt(() => {
    !l && r() && h(i)?.scrollIntoView({ block: "nearest", inline: "nearest" }), l = r();
  });
  var a = Gi();
  pn(a, () => ({
    class: `f fm w-full text-left p4 border-bottom cursor-pointer ${r() ? "bg-link text-white" : "hover-bg-primary hover-text-white"}`,
    type: "button",
    ...n
  }));
  var u = B(a), s = B(u), f = le(u, 2), o = B(f), d = B(o);
  _t(a, (c) => I(i, c), () => h(i)), Xe(() => {
    Qe(s, "src", t.favIconUrl), Je(d, t.name);
  }), _e(e, a), nt();
}
var Zi = (e, t) => {
  e.stopPropagation(), t.onToggleRead?.();
}, Ji = /* @__PURE__ */ fn('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="#999" stroke="#999" stroke-width="2"></circle><polyline points="7 12.5 10.5 16 17 9" fill="none" stroke="white" stroke-width="2.2"></polyline></svg>'), Qi = /* @__PURE__ */ fn('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><polyline points="7 12.5 10.5 16 17 9" fill="none" stroke="currentColor" stroke-width="2.2"></polyline></svg>'), el = /* @__PURE__ */ Be('<div class="flex-fixed ml-auto pl6 f fh" role="button" tabindex="0"><!></div>'), tl = /* @__PURE__ */ Be('<button><div class="mr4 flex-fixed s24 f fh bg-white rounded-4"><img class="object-fit-cover s20" alt=""/></div> <div class="f-1 overflow-hidden"><div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12"> </div> <div> </div></div> <!></button>');
function rl(e, t) {
  rt(t, !0);
  let r = Re(t, "selected", 3, !1), n = Re(t, "favIconUrl", 3, ""), i = Re(t, "title", 3, ""), l = Re(t, "hasBeenRead", 3, !1), a = Re(t, "isReadingList", 3, !1), u = /* @__PURE__ */ bn(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "class",
    "selected",
    "favIconUrl",
    "title",
    "url",
    "hasBeenRead",
    "isReadingList",
    "onToggleRead"
  ]), s = /* @__PURE__ */ P(void 0), f = !1;
  dt(() => {
    !f && r() && h(s)?.scrollIntoView({ block: "nearest", inline: "nearest" }), f = r();
  });
  var o = tl();
  pn(o, () => ({
    class: `${t.class ?? ""} f fm w-full p4 border-bottom cursor-pointer text-left ${r() ? "bg-link text-white" : "hover-bg-primary hover-text-white"}`,
    type: "button",
    ...u
  }));
  var d = B(o), c = B(d), p = le(d, 2), _ = B(p), g = B(_), w = le(_, 2), D = B(w), b = le(p, 2);
  {
    var x = (T) => {
      var S = el();
      S.__click = [Zi, t];
      var m = B(S);
      {
        var O = (Y) => {
          var re = Ji();
          _e(Y, re);
        }, q = (Y) => {
          var re = Qi();
          _e(Y, re);
        };
        pr(m, (Y) => {
          l() ? Y(O) : Y(q, !1);
        });
      }
      Xe(() => Qe(S, "title", l() ? "既読" : "未読")), _e(T, S);
    };
    pr(b, (T) => {
      a() && T(x);
    });
  }
  _t(o, (T) => I(s, T), () => h(s)), Xe(() => {
    Qe(c, "src", n()), Je(g, i()), dn(w, 1, `line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 ${r() ? "text-white" : "text-weak"}`), Je(D, t.url);
  }), _e(e, o), nt();
}
kt(["click"]);
function nl(e, t, r) {
  I(t, !0), r();
}
var il = /* @__PURE__ */ Be('<div><div class="bg-whitesmoke border-bottom w-full py8 px6 fs12 flex-fixed"> </div> <!></div>'), ll = /* @__PURE__ */ Be('<form class="f flex-column s-full"><input class="input w-full fs12 flex-fixed letter-spacing-1" type="search"/> <div tabIndex="-1" class="outline-none f w-full overflow-hidden"><div class="flex-fixed w200 h-full f flex-column border-right"><div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">Shift + ↓↑</div> <div class="s-full overflow-scroll"></div></div> <div class="s-full f flex-column"><div class="bg-lightgray w-full p6 fs12 text-center flex-fixed"> </div> <div class="overflow-scroll s-full"></div></div></div></form>');
function sl(e, t) {
  rt(t, !0);
  let r = null, n = /* @__PURE__ */ P(null), i = /* @__PURE__ */ P(void 0), l = /* @__PURE__ */ P(void 0), a = /* @__PURE__ */ P(""), u = /* @__PURE__ */ P([]), s = /* @__PURE__ */ P(0), f = /* @__PURE__ */ P(!1), o = /* @__PURE__ */ P(!1), d = !1, c = 0, p = null;
  const _ = new et(), g = new et();
  let w = /* @__PURE__ */ P("normal");
  const D = /* @__PURE__ */ me(() => ({
    normal: "タブ",
    bookmark: "ブックマーク",
    bookmarklet: "ブックマークレット",
    readingList: "リーディングリスト"
  })[h(w)]);
  ci(() => {
    var v = null;
    I(n, null), r = null, h(u)?.some((k) => k.tabs.some((C) => {
      var N = C.__index === h(s);
      return N && (v = C, I(n, k)), N;
    })), v && (r = v);
  }), dt(() => {
    h(i)?.focus(), S();
  }), dt(() => {
    h(o) && (h(f) || r && O(r));
  });
  function b(v) {
    v.preventDefault(), I(o, !0);
  }
  function x(v, k) {
    if (!k) return [v];
    var C = k.toLowerCase(), N = at.reg.createSearch(k, "i"), R = [], j = [];
    return v.forEach((E) => {
      var y = E.isBookmarklet ? -1 : E.url.indexOf(C), U = (E.type === "bookmark" ? E.path : E.title) || "", $ = U.toLowerCase().indexOf(C);
      if (E.isSearchText = !1, E.searchText && ($ = E.searchText.toLowerCase().indexOf(C), E.isSearchText = !0), y !== -1 || $ !== -1)
        R.push({
          item: E,
          title: U,
          urlIndex: y === -1 ? 1 / 0 : y,
          titleIndex: $ === -1 ? 1 / 0 : $
        });
      else {
        var J = E.isBookmarklet ? !1 : N.test(E.url), Ae = N.test(U);
        E.isSearchText = !1, E.searchText && (E.isSearchText = !0, Ae = Ae || N.test(E.searchText)), (J || Ae) && j.push({ title: U, item: E, urlTest: J, titleTest: Ae });
      }
    }), [
      R.sort((E, y) => E.urlIndex === y.urlIndex ? E.titleIndex === y.titleIndex ? E.title.length - y.title.length : E.titleIndex - y.titleIndex : E.urlIndex - y.urlIndex).map((E) => E.item),
      j.sort((E, y) => {
        var U = Number(E.titleTest) + Number(E.urlTest), $ = Number(y.titleTest) + Number(y.urlTest);
        return U === $ ? E.title.length - y.title.length : $ - U;
      }).map((E) => E.item)
    ];
  }
  async function T(v) {
    var k = [];
    if (/^</.test(v))
      I(w, "readingList"), k = await Nt.getAll(), v = v.slice(1);
    else if (/^\>/.test(v))
      I(w, "bookmarklet"), k = await Ct.getAll(), k = k.filter((C) => C.isBookmarklet), v = v.slice(1);
    else if (/^\s/.test(v))
      I(w, "bookmark"), k = await Ct.getAll(), k = k.filter((C) => !C.isBookmarklet), v = v.slice(1);
    else {
      I(w, "normal");
      let [C, N] = await Promise.all([de.getAllByAllWindow(), Ct.getAll()]);
      k = C.map((R) => ({
        id: R.id ?? 0,
        title: R.title || "",
        url: R.url || "",
        favIconUrl: R.favIconUrl,
        tab: R
      })), N = N.filter((R) => !R.isBookmarklet), N.forEach((R) => {
        var j = k.find((E) => E.url === R.url);
        j && (j.searchText = R.path);
      });
    }
    if (v) {
      const C = [];
      v.split(/\s+/).reduce(
        (N, R) => {
          const j = [];
          return N.forEach((E) => {
            x(E, R).forEach((y) => {
              y.length > 0 && j.push(y);
            });
          }), j;
        },
        [k]
      ).forEach((N) => N.forEach((R) => C.push(R))), k = C;
    }
    return k;
  }
  async function S() {
    var v = h(a), k = await T(v), C = {}, N = [], R = /^.*\:\/\/([^\/]*)\//i, j = (y) => {
      var U = null;
      if (h(w) === "readingList" && y.hasBeenRead)
        U = "既読";
      else if (y.isBookmarklet)
        U = "ブックマークレット";
      else {
        var $ = y.url.match(R);
        $ && (U = $[1].replace(/^www\./, "").replace(/\:\d+/, "")), U || (U = "その他");
      }
      var J = C[U];
      J || (J = C[U] = { favIconUrl: y.favIconUrl, name: U, tabs: [] }, N.push(J)), J.tabs.push(y);
    }, E = () => {
      var y = 0;
      N.forEach((U, $) => {
        U.__index = $, U.tabs.forEach((J) => {
          J.__index = y++;
        });
      }), c = y;
    };
    k.forEach(j), E(), I(u, N), I(s, 0), I(f, !1), h(l) && (h(l).scrollTop = 0);
  }
  const m = Wi(S, 64);
  async function O(v) {
    if (v.isBookmarklet) {
      const R = (await de.getCurrent()).id;
      if (typeof R != "number") {
        console.error("Current tab ID is not a number:", R);
        return;
      }
      if (!v.script || !v.script.startsWith("javascript:")) {
        console.error("Invalid bookmarklet script:", v.script);
        return;
      }
      if (!chrome.userScripts) {
        alert("拡張機能の設定画面から「ユーザー スクリプトを許可する」を有効にしてください。");
        return;
      }
      await chrome.userScripts.execute({
        js: [
          {
            code: decodeURIComponent(v.script.slice(11))
          }
        ],
        world: "MAIN",
        target: { tabId: R },
        injectImmediately: !0
      }).catch((j) => {
        console.error(j.message);
      }), close();
    } else if (v.type === "bookmark" || v.type === "readingList") {
      var k = await de.getAllByAllWindow(), C = v.url.replace(/\/$/g, ""), N = k.find((R) => (R.url || "").replace(/\/$/g, "") === C);
      N ? (de.activate(N), at.close()) : open(v.url);
    } else
      v.tab && de.activate(v.tab), at.close();
  }
  function q(v) {
    I(s, v.tabs[0]?.__index || 0, !0);
  }
  function Y(v, k) {
    Nt.toggleRead(v, k), I(u, h(u).map((C) => ({
      ...C,
      tabs: C.tabs.map((N) => N.url === v ? { ...N, hasBeenRead: k } : N)
    })));
  }
  function re() {
    if (d && p) {
      for (const v of h(u))
        for (const k of v.tabs)
          if (k.url === p.url) return k;
      return p;
    }
    if (r) return r;
    for (const v of h(u))
      for (const k of v.tabs)
        if (k.__index === h(s)) return k;
    return null;
  }
  function ge(v) {
    return v ? h(w) === "readingList" ? g.has(v.url) : typeof v.tab?.id == "number" ? _.has(v.tab.id) : !1 : !1;
  }
  function ne(v) {
    typeof v?.tab?.id == "number" && (ge(v) || (_.add(v.tab.id), chrome.tabs.remove(v.tab.id)));
  }
  function it(v) {
    var k = v.code, C = k === "ArrowUp", N = k === "ArrowDown", R = h(n);
    if (v.ctrlKey) {
      var j = {
        d() {
          v.preventDefault();
          var y = re();
          if (y)
            if (h(w) === "readingList") {
              if (g.has(y.url)) return;
              g.add(y.url), Nt.remove(y.url);
            } else
              ne(y);
        },
        x() {
          if (v.preventDefault(), h(w) === "readingList") {
            var y = re();
            y && Y(y.url, !y.hasBeenRead);
          }
        }
      }[v.key];
      j?.();
      return;
    }
    if (v.shiftKey) {
      if (C) {
        if (v.preventDefault(), d = !1, R) {
          var E = h(u)[Math.max(0, (R.__index || 0) - 1)];
          E && I(s, E.tabs[0].__index || 0, !0);
        }
      } else if (N && (v.preventDefault(), d = !1, R)) {
        var E = h(u)[Math.min(h(u).length - 1, (R.__index || 0) + 1)];
        E && I(s, E.tabs[0].__index || 0, !0);
      }
    } else C ? (v.preventDefault(), d = !1, I(s, Math.max(0, h(s) - 1), !0)) : N ? (v.preventDefault(), d = !1, I(s, Math.min(c - 1, h(s) + 1), !0)) : document.activeElement !== h(i) && h(i)?.focus();
  }
  function Fe() {
    d = !0;
  }
  function be(v) {
    p = v;
  }
  var fe = ll();
  fe.__keydown = it, fe.__mousemove = Fe;
  var Te = B(fe);
  Te.__input = [nl, f, m], _t(Te, (v) => I(i, v), () => h(i));
  var It = le(Te, 2), nr = B(It), yn = le(B(nr), 2);
  Tt(yn, 21, () => h(u), (v) => v.name, (v, k) => {
    {
      let C = /* @__PURE__ */ me(() => h(n) === h(k));
      Xi(v, {
        get name() {
          return h(k).name;
        },
        get favIconUrl() {
          return h(k).favIconUrl;
        },
        get selected() {
          return h(C);
        },
        onclick: () => q(h(k))
      });
    }
  });
  var En = le(nr, 2), ir = B(En), xn = B(ir), lr = le(ir, 2);
  Tt(lr, 21, () => h(u), (v) => v.name, (v, k) => {
    var C = il(), N = B(C), R = B(N), j = le(N, 2);
    Tt(j, 17, () => h(k).tabs, (E) => E.id, (E, y) => {
      {
        let U = /* @__PURE__ */ me(() => ge(h(y)) ? "opacity-50 pointer-none" : ""), $ = /* @__PURE__ */ me(() => h(y).isSearchText ? h(y).searchText : h(y).title), J = /* @__PURE__ */ me(() => h(y).__index === h(s)), Ae = /* @__PURE__ */ me(() => h(w) === "readingList"), kn = /* @__PURE__ */ me(() => h(w) === "readingList" ? () => Y(h(y).url, !h(y).hasBeenRead) : void 0);
        rl(E, {
          get class() {
            return h(U);
          },
          get favIconUrl() {
            return h(y).favIconUrl;
          },
          get title() {
            return h($);
          },
          get url() {
            return h(y).url;
          },
          onclick: () => O(h(y)),
          get selected() {
            return h(J);
          },
          onmouseenter: () => be(h(y)),
          get hasBeenRead() {
            return h(y).hasBeenRead;
          },
          get isReadingList() {
            return h(Ae);
          },
          get onToggleRead() {
            return h(kn);
          }
        });
      }
    }), Xe(() => Je(R, h(k).name)), _e(v, C);
  }), _t(lr, (v) => I(l, v), () => h(l)), Xe(() => Je(xn, `↓↑ ${h(D) ?? ""}`)), sn("submit", fe, b), Ki(Te, () => h(a), (v) => I(a, v)), _e(e, fe), nt();
}
kt(["keydown", "mousemove", "input"]);
async function al() {
  await de.sort(), at.close();
}
var ul = /* @__PURE__ */ Be('<main class="svelte-ifndvb"><div class="f flex-column s-full"><div class="f flex-column h0 flex-auto w-full"><!></div> <button type="button" class="button primary flex-fixed">タブソート</button></div></main>');
function vl(e, t) {
  rt(t, !0);
  var r = ul();
  sn("keydown", Ut, (u) => {
    (u.metaKey || u.ctrlKey) && u.key === "p" && (u.preventDefault(), close());
  });
  var n = B(r), i = B(n), l = B(i);
  sl(l, {});
  var a = le(i, 2);
  a.__click = [al], _e(e, r), nt();
}
kt(["click"]);
export {
  vl as Main,
  ol as mount,
  cl as tabHistory,
  de as tabUtil
};
